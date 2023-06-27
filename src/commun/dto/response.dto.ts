export class ResponseDto {

    public ok: Boolean;
    public data?: any;
    public error?: Boolean | false;

    public  constructor(   
       public mensaje?: String | "",
       private _error?: Boolean | false
      ){

       this.error = _error ? _error : false;
       this.ok = !this.error;
    }
}