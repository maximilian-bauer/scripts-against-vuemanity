
export default class Config{
    
    public appName = "Scripts Against Vuemanity"

    public wsServerUrl = "ws://192.168.178.46:3000";

    public wsOptions = {    
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
    };
}