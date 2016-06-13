import * as DetailActions from './DetailActions'
import * as EssenceActions from './EssenceActions'
import * as UserActions from './UserActions'
import * as TabActions from './TabActions'
import * as UtilsActions from './UtilsActions'

export default {
  ...DetailActions,
  ...EssenceActions,
  ...TabActions,
  ...UserActions,
  ...UtilsActions
}
