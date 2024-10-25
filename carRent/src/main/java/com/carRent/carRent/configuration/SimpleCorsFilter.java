package com.carRent.carRent.configuration;

import java.io.IOException;
import java.util.HashMap;

import jakarta.servlet.Filter;

import java.util.Map;
import java.util.logging.LogRecord;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCorsFilter implements Filter {

     @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse res = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;
        Map<String, String> headers = new HashMap<>();

        String originHeader = req.getHeader("Origin");

        // Set CORS headers
        res.setHeader("Access-Control-Allow-Origin", originHeader);
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Max-Age", "3600");

        // For OPTIONS requests (preflight), send OK response directly
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            res.setStatus(HttpServletResponse.SC_OK);
        } else {
            // Continue with the rest of the filter chain for other requests
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }

   

} 
    
