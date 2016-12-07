class EspusbApi extends RespondingSocket {
    constructor(wsUri=`ws://${location.host}/d/ws/issue`) {
        super(wsUri)
        this.MSG_ECHO = 'e'
        this.MSG_WIFI_INFORMATION = 'WI'
        this.MSG_WIFI_SCAN = 'WS'
        this.MSG_SYSTEM_CLOCK = 'I'
        this.MSG_SYSTEM_NAME = 'IN'
        this.MSG_SYSTEM_DESCRIPTION = 'ID'
        this.MSG_SYSTEM_SAVE = 'IS'
        this.MSG_SYSTEM_REVERT_FROM_SAVED = 'IL'
        this.MSG_SYSTEM_REVERT_TO_FACTORY = 'IR'
        this.MSG_SYSTEM_REBOOT = 'IB'
        this.MSG_WIFI_SCAN_RESULTS = 'WR' // TODO: find out what this actually is
        this.MGS_WIFI_SETTINGS_PREFIX = 'W'
        this.MSG_GPIO_STATE_TOGGLE_PREFIX = 'GF'
        this.MSG_GPIO_IO_TOGGLE_PREFIX = 'GI'
        this.MSG_GPIO_GET_STATES = 'GS'
        this.MSG_BS = 'BS' // TODO: find out what exactly this is
        this.MSG_BI = 'BI' // TODO: find out what exactly this is
        this.MSG_FLASH_BLA_PREFIX = 'FB' // TODO: find out what exactly this is
        this.MSG_FLASH_BLABLA_PREFIX = 'FX' // TODO: find out what exactly this is

        this.MPFS_ADDRESS = 65536 //1048576 NOTE: If you select 1048576, it will override the 65536 sector, but has much more room.
        this.FLASH_SCRATCHPAD_ADDRESS = 524288
        this.FLASH_BLOCK_SIZE = 65536
        this.FLASH_SEND_SIZE = 256
    }
    //TODO: parse res.data to provide clean return values
    echo() {
        return super.queueMessage(this.MSG_ECHO).then(res=> {
            return res.data
        })
    }
    wifiGetInfo() {
        return super.queueMessage(this.MSG_WIFI_INFORMATION).then(res=> {
            return res.data
        })
    }
    wifiScan() {
        return super.queueMessage(this.MSG_WIFI_SCAN).then(res=> {
            return res.data
        })
    }
    systemGetClock() {
        return super.queueMessage(this.MSG_SYSTEM_CLOCK).then(res=> {
            return res.data
        })
    }
    systemSetName() {
        return super.queueMessage(this.MSG_SYSTEM_NAME).then(res=> {
            return res.data
        })
    }
    systemSetDescription() {
        return super.queueMessage(this.MSG_SYSTEM_DESCRIPTION).then(res=> {
            return res.data
        })
    }
    systemSave() {
        return super.queueMessage(this.MSG_SYSTEM_SAVE).then(res=> {
            return res.data
        })
    }
    systemRevertFromSaved() {
        return super.queueMessage(this.MSG_SYSTEM_REVERT_FROM_SAVED).then(res=> {
            return res.data
        })
    }
    systemRevertToFactory() {
        return super.queueMessage(this.MSG_SYSTEM_REVERT_TO_FACTORY).then(res=> {
            return res.data
        })
    }
    systemReboot() { // TODO: find out if this has a response
        return super.queueMessage(this.MSG_SYSTEM_REBOOT).then(res=> {
            return res.data
        })
    }
    wifiGetScanResults() { // TODO: find out if this is even correct
        return super.queueMessage(this.MSG_WIFI_SCAN_RESULTS).then(res=> {
            return res.data
        })
    }
    wifiSetSettings(type,name,password,mac,channel) {
        return super.queueMessage(`${this.MGS_WIFI_SETTINGS_PREFIX}\t${type}\t${name}\t${password}\t${mac}\t${channel}`).then(res=> {
            return res.data
        })
    }
    gpioIoToggle(pin) {
        return super.queueMessage(`${this.MSG_GPIO_IO_TOGGLE_PREFIX}${pin}`).then(res=> {
            return res.data
        })
    }
    gpioStateToggle(pin) {
        return super.queueMessage(`${this.MSG_GPIO_STATE_TOGGLE_PREFIX}${pin}`).then(res=> {
            return res.data
        })
    }
    gpioGetStates() {
        return super.queueMessage(this.MSG_GPIO_GET_STATES).then(res=> {
            return res.data
        })
    }
    flashImage(file,address) { 
        // This will be a pain in the ***
        return super.queueMessage(this.MSG_GPIO_GET_STATES).then(res=> {
            return res.data
        })
    }
}