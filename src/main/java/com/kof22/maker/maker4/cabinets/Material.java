package com.kof22.maker.maker4.cabinets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
public class Material
{
   private @Id @GeneratedValue
   Long id;

   private String label;
   private String name;
   private String description;

   @Column(precision = 8, scale = 2)
   private BigDecimal inch_width;

   @Column(precision = 8, scale = 2)
   private BigDecimal inch_length;

   @Column(precision = 8, scale = 2)
   private BigDecimal inch_thickness;

   @Column(precision = 8, scale = 2)
   private BigDecimal mm_width;

   @Column(precision = 8, scale = 2)
   private BigDecimal mm_length;

   @Column(precision = 8, scale = 2)
   private BigDecimal mm_thickness;

   @ManyToOne(fetch = FetchType.EAGER)
   private MaterialType materialType;

   @Version @JsonIgnore
   private Long version;

   private Material()
   {
   }

   public Material(String label, String name, String description, BigDecimal inch_width, BigDecimal inch_length, BigDecimal inch_thickness, BigDecimal mm_width, BigDecimal mm_length, BigDecimal mm_thickness, MaterialType materialType)
   {
      this.label = label;
      this.name = name;
      this.description = description;
      this.inch_width = inch_width;
      this.inch_length = inch_length;
      this.inch_thickness = inch_thickness;
      this.mm_width = mm_width;
      this.mm_length = mm_length;
      this.mm_thickness = mm_thickness;
      this.materialType = materialType;
   }

   public Material(String label, String name, String description, double inch_width, double inch_length, double inch_thickness, double mm_width, double mm_length, double mm_thickness, MaterialType materialType)
   {
      this.label = label;
      this.name = name;
      this.description = description;
      this.inch_width = new BigDecimal(inch_width);
      this.inch_length = new BigDecimal(inch_length);
      this.inch_thickness = new BigDecimal(inch_thickness);
      this.mm_width = new BigDecimal(mm_width);
      this.mm_length = new BigDecimal(mm_length);
      this.mm_thickness = new BigDecimal(mm_thickness);
      this.materialType = materialType;
   }
}
