package com.prepflow.common;
import com.prepflow.auth.AuthController.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
@RestControllerAdvice public class ApiExceptionHandler {
 @ExceptionHandler(UnauthorizedException.class) ResponseEntity<ApiError> unauthorized(UnauthorizedException e,HttpServletRequest r){return response(HttpStatus.UNAUTHORIZED,e.getMessage(),r);}
 @ExceptionHandler({IllegalArgumentException.class}) ResponseEntity<ApiError> badRequest(RuntimeException e,HttpServletRequest r){return response(HttpStatus.BAD_REQUEST,e.getMessage(),r);}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiError> validation(MethodArgumentNotValidException e,HttpServletRequest r){String m=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+": "+x.getDefaultMessage()).orElse("Invalid request.");return response(HttpStatus.BAD_REQUEST,m,r);}
 private ResponseEntity<ApiError> response(HttpStatus s,String m,HttpServletRequest r){return ResponseEntity.status(s).body(new ApiError(Instant.now(),s.value(),m,r.getRequestURI()));}
 public record ApiError(Instant timestamp,int status,String message,String path){}
}
