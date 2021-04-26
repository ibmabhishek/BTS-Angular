import { PRIORITY } from './PRIORITY';
import { STATUS } from './STATUS';
import { TYPE } from './TYPE';
export class Bug {
  id: string;
  // priority: PRIORITY;
  // type: TYPE;
  // status: STATUS;
  type: string = 'PROBLEM_REQUEST';
  priority: string = 'LOW';
  status: string = 'NEW';
  buildVersion: string;
  projectId: string;
  submitOnDate = '';
  module: string;
  description = '';
  title = '';
  product: string;
  etaDate = '';
  timeRequired: number;
}
