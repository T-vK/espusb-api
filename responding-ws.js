'use strict'

class RespondingSocket {
    constructor(wsUri=`ws://${location.host}`) {
	    this.wsUri = wsUri
        this.eventStack = []
        this.currentMsgObj = {}
        this.ready = false
        
        this.setUpSocket()
    }
    setUpSocket() {
        if (this.ws) {this.ws.close()}
        this.ws = new WebSocket(this.wsUri)
        this.ws.onmessage = (res) => {
            if (res.data) { // filter out automatic ping responses
                this.currentMsgObj.resolver(res)
                this.sendNextMessage()
            }
        }
        this.ws.onclose = () => {
            if (this.onclose) {this.onclose()}
            this.ready = false
            this.setUpSocket()
        }
        this.ws.onopen = () => {
            if (this.onopen) {this.onopen()}
            this.ready = true
            this.queueMessage('e') // TODO: get rid of this again
            this.sendNextMessage()
        }
        this.ws.onerror = (err) => {
            if (this.onerror) {this.onerror(err)}
            console.error(err)
        }
    }
    
    queueMessage(msg) {
        let promise = new Promise( (resolve,reject) => {
            this.eventStack.push({msg:msg,resolver:resolve})
        })
        if (!this.currentMsgObj)
            this.sendNextMessage()
        return promise
    }
    sendNextMessage() {
        if (this.ready) {
            if (this.eventStack.length > 0) {
                this.currentMsgObj = this.eventStack.pop()
                this.ws.send(this.currentMsgObj.msg)
            } else
                this.currentMsgObj = {}
        }
        this.queueMessage('wx') //FIXME: This seems to be required, but obviously causes massive traffic
    }
}