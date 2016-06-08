import * as DetailActions from './DetailActions'
import * as EssenceActions from './EssenceActions'
import * as UserActions from './UserActions'
import * as TabActions from './TabActions'

export default {
  ...DetailActions,
  ...EssenceActions,
  ...TabActions,
  ...UserActions
}
