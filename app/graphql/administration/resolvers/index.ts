import { UserResolver } from './UserResolver';
import { AuditLoginResolver } from './AuditLoginResolver';
import { CategoryEmailResolver } from './CategoryEmailResolver';
import { CategoryNotificationResolver } from './CategoryNotificationResolver';
import { EmailResolver } from './EmailResolver';
import { InboxResolver } from './InboxResolver';
import { MenuResolver } from './MenuResolver';
import { ModuleResolver } from './ModuleResolver';
import { NotificationResolver } from './NotificationResolver';
import { RoleMenuResolver } from './RoleMenuResolver';
import { RoleResolver } from './RoleResolver';
import { SettingEmailResolver } from './SettingEmailResolver';
import { SettingNotificationResolver } from './SettingNotificationResolver';
import { VersionResolver } from './VersionResolver';

export const resolvers = [
  AuditLoginResolver,
  CategoryEmailResolver,
  CategoryNotificationResolver,
  EmailResolver,
  InboxResolver,
  MenuResolver,
  ModuleResolver,
  NotificationResolver,
  RoleMenuResolver,
  RoleResolver,
  SettingEmailResolver,
  SettingNotificationResolver,
  UserResolver,
  VersionResolver,
];
