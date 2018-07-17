export class LoggingService {

    
    logStatusChange(status: string) {
        console.log("a server status change, new status: " + status);
    }
}