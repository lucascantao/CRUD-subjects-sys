package com.lucascantao.mycrud.config.exception;

import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ApiException extends RuntimeException {

    private static final long serialVersionUID = 5896788950332191996L;

    public ApiException(String message, int code ) {
        this(message,code,null);
    }

    public ApiException(String message, int code, Exception e ) {
        super(message,e);
        this.code=code;
    }

    public ApiException(String message, int code, String body, Exception e ) {
        super(message,e);
        this.code=code;
    }

    @Getter
    private InternalError internalCode;
    private int code;
    private String body;

    /**
     * @return the code
     */
    public int getCode() {
        return code;
    }

    public HttpStatus getStatusCode() {
        return HttpStatus.valueOf(code);
    }

    public Boolean isOk(){
        HttpStatus status=getStatusCode();
        return status.is1xxInformational()||status.is2xxSuccessful()||status.is3xxRedirection();
    }

    /**
     * @return the body
     */
    public String getBody() {
        return body;
    }

    public ResponseEntity getResponseEntity(){
        HttpStatus status=getStatusCode();

        StringBuilder json= new StringBuilder();
        json.append("{");
        json.append("\"message\":\""+(super.getMessage()==null?(""):(super.getMessage().replaceAll("\"", "\\\\\"")))+"\"");
        json.append(",\"code\":"+code);

        json.append(",\"ok\":"+isOk());
        json.append("}");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(json,headers,status);
    }
}
