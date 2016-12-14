class EspusbApi extends RespondingSocket {
    constructor(wsUri=`ws://${location.host}/d/ws/issue`) {
        super(wsUri)
        super.onopen = this.onopen
        super.onopen = this.onclose
        super.onopen = this.onerror
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
        this.MSG_ON_SEND_MSG = 'wx' // TODO: find out what the point of this is and why it's spammed to crazy

        this.MPFS_ADDRESS = 65536 //1048576 NOTE: If you select 1048576, it will override the 65536 sector, but has much more room.
        this.FLASH_SCRATCHPAD_ADDRESS = 524288
        this.FLASH_BLOCK_SIZE = 65536
        this.FLASH_SEND_SIZE = 256
        
        // -- HID ---
        this.MSG_KEYBOARD_PREFIX = 'CK'
        this.MSG_KEYBOARD_DIVIDER = '\t'
        this.MSG_KEYBOARD_RESPONSE = 'CK'
        // TODO: make this more general using usage codes and define different keyboard layouts
        // Usage codes and their translations are found at http://www.usb.org/developers/hidpage/Hut1_12v2.pdf page 53
        this.KEYS = { //INFO: This is for the German qwertz-keyboard layout
            'NONE': 0,
            'a': 4,
            'b': 5,
            'c': 6,
            'd': 7,
            'e': 8,
            'f': 9,
            'g': 10,
            'h': 11,
            'i': 12,
            'j': 13,
            'k': 14,
            'l': 15,
            'm': 16,
            'n': 17,
            'o': 18,
            'p': 19,
            'q': 20,
            'r': 21,
            's': 22,
            't': 23,
            'u': 24,
            'v': 25,
            'w': 26,
            'x': 27,
            'z': 28,
            'y': 29, 
            '1': 30,
            '2': 31,
            '3': 32,
            '4': 33,
            '5': 34,
            '6': 35,
            '7': 36,
            '8': 37,
            '9': 38,
            '10': 39,
            'ENTER': 40,
            'Esc': 41,
            ' ': 44, //Space
            'ß': 45,
            '´': 46,
            'ü': 47,
            '+': 48,
            '#': 49,
            '#': 50,
            'ö': 51,
            'ä': 52,
            '^': 53,
            ',': 54,
            '.': 55,
            '-': 56,
            'CAPSLOCK': 57, //TODO: confirm this
            'F1': 58,
            'F2': 59,
            'F3': 60,
            'F4': 61,
            'F5': 62,
            'F6': 63,
            'F7': 64,
            'F8': 65,
            'F9': 66,
            'F10': 67,
            'F11': 68,
            'F12': 69,
            'Prnt': 70, //TODO: confirm this
            'Pause': 72,
            'Home': 74,
            'PgUp': 75,
            'Del': 76,
            'End': 77,
            'PgDn': 78,
            'Right': 79,
            'Left': 80,
            'Down': 81,
            'Up': 82,
            'VolUp': 128,
            'VolDn': 129
        }
        this.KEYS_MODIFIER = {
            'NONE': 0,
            'CTRL': 1,
            'SHIFT': 2,
            'CTRL+SHIFT': 3,
            'ALT': 4,
            'CTRL+ALT': 5,
            'SHIFT+ALT': 6,
            'CTRL+SHIFT+ALT': 7,
            'WIN': 8,
            'CTRL+WIN': 9,
            'SHIFT+WIN': 10,
            'CTRL+ALT+WIN': 11,
            'ALT+WIN': 12,
            'CTRL+ALT+WIN': 13,
            'SHIFT+ALT+WIN': 14,
            'CTRL+SHIFT+ALT+WIN': 15,
        }
        
        this.MSG_MOUSE_PREFIX = 'CM'
        this.MSG_MOUSE_DIVIDER = '\t'
        this.MSG_MOUSE_RESPONSE = 'CM'
        this.MOUSE_KEYS = {
            'LEFT': 1,
            'RIGHT': 2,
            'MIDDLE': 4
        } //Example: 'CK1\t0\t1' - Left down, Middle Up, Right Down
        //TODO: mouse movement
    }
    onopen(){}
    onclose(){}
    onerror(){}
    
    keyboardAction(key='NONE',modifiers='NONE') {
        console.log(`${this.MSG_KEYBOARD_PREFIX}${this.KEYS_MODIFIER[modifiers]}${this.MSG_KEYBOARD_DIVIDER}${this.KEYS[key]}`)
        return super.queueMessage(`${this.MSG_KEYBOARD_PREFIX}${this.KEYS_MODIFIER[modifiers]}${this.MSG_KEYBOARD_DIVIDER}${this.KEYS[key]}`).then(res=> {
            return (res.data == this.MSG_KEYBOARD_RESPONSE)
        })
    }
    keyboardReleaseKeys() { // apparantly we can only release all keys or none...
        return this.keyboardAction('NONE','NONE')
    }
    customCommand(msg) {
        return super.queueMessage(msg).then(res=> {
            return res.data
        })
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