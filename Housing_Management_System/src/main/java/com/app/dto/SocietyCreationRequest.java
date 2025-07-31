package com.app.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocietyCreationRequest {
    
    @NotBlank(message = "Society name is required")
    @Size(min = 2, max = 100, message = "Society name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Society address is required")
    @Size(min = 5, max = 255, message = "Society address must be between 5 and 255 characters")
    private String address;

    @NotBlank(message = "Registration number is required")
    @Size(min = 3, max = 50, message = "Registration number must be between 3 and 50 characters")
    private String registrationNumber;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits")
    private String pincode;
    
    @Min(value = 1, message = "Number of buildings must be at least 1")
    private Integer numberOfBuildings;
}
