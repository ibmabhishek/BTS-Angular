import { PRIORITY } from './PRIORITY';
import { STATUS } from './STATUS';
import { TYPE } from './TYPE';
export class Bug {
  id: string;
  priority: PRIORITY;
  type: TYPE;
  status: STATUS;
  buildVersion: string;
  projectId: string;
  submitOnDate: Date;
  module: string;
  description = '';
  title = '';
  product: string;
  etaDate = '';
  timeRequired: number;
}
