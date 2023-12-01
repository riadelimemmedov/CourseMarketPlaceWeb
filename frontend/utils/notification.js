//!Third party packages
import { toast } from 'react-toastify'


//throwNotification
const throwNotification = (notification_message=null,notification_type=null,notification_code=null) => {
    if(notification_code == "-32002"){
        notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : notification_type === 'info' ? toast.info(`${notification_message}`) : null;
    }
    else if(notification_code == null){
        notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : notification_type === 'info' ? toast.info(`${notification_message}`) : null;
    }
}

export default {throwNotification}