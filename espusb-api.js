class EspusbApi extends RespondingSocket {
    constructor(wsUri=`ws://${location.host}/d/ws/issue`) {
        super(wsUri)
        this.MSG_ECHO = 'e'
        this.MSG_WIFI_INFORMATION = 'WI'
        this.MSG_WIFI_SCAN= 'WS'
    }
    getEcho() {
        return super.queueMessage(this.MSG_ECHO).then(res=> {
            return res.data
        })
    }
    getWifiInfo() {
        return super.queueMessage(this.MSG_WIFI_INFORMATION).then(res=> {
            return res.data
        })
    }
    doWifiScan() {
        return super.queueMessage(this.MSG_WIFI_SCAN).then(res=> {
            return res.data
        })
    }
}