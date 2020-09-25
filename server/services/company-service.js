import uniqid from 'uniqid';
import { Company, User, Employee, Invitation } from '@server/models';
import { ROLE_NAMES } from '@server/constants';
import { AWS } from '@server/third-party';
import config from '@server/config';

export const addModules = async (companyId, moduleId, moduleCount) => {
  const companyModule = await Company.relatedQuery('modules')
    .for(companyId)
    .where('moduleId', moduleId)
    .first();

  if (!companyModule) {
    await Company.relatedQuery('modules').for(companyId).relate({
      id: moduleId,
      moduleCount
    });
  } else {
    await Company.relatedQuery('modules')
      .for(companyId)
      .patch({
        moduleCount: companyModule.moduleCount + moduleCount
      })
      .where('moduleId', moduleId);
  }
};

export const inviteEmployee = async (companyId, input) => {
  const user = await User.query().findOne('email', input.email);
  const roleName = input.admin ? ROLE_NAMES.ADMIN : ROLE_NAMES.EMPLOYEE;

  if (!user) {
    const encryptedInvitation = uniqid();
    await Invitation.query().insert({
      encryptedInvitation,
      inviteeEmail: input.email,
      companyId,
      metadata: input
    });
    const company = await Company.query().findById(companyId);
    await AWS.ses.sendTemplatedEmail(
      config.emailTemplates.invitation,
      'idougwarner@gmail.com',
      input.email,
      {
        company_name: company.name,
        role_name: roleName,
        invitation_link: `${config.baseUrl}/invitation/${encryptedInvitation}`
      }
    );
    return 'INVITATION_SENT';
  }

  const employee = await Employee.query()
    .where({
      userId: user.id,
      companyId,
      roleName
    })
    .first();

  if (employee) return 'EMPLOYEE_ALREADY_EXISTS';

  await Employee.query().insert({
    userId: user.id,
    companyId,
    roleName,
    supervisorEmail: input.supervisorEmail,
    title: input.title,
    departmentId: input.departmentId,
    safetySensitive: input.safetySensitive
  });

  return 'EMPLOYEE_ADDED';
};
