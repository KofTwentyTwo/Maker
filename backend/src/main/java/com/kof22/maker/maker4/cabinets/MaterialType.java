package com.kof22.maker.maker4.cabinets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class MaterialType
{
   private @Id @GeneratedValue Long id;
   private String label;
   private String name;
   private String description;

   @OneToMany(fetch = FetchType.EAGER)
   private Set<Material> materials;

   @Version @JsonIgnore private Long version;

   private MaterialType()
   {
   }

   public MaterialType(String label, String name, String description)
   {
      this.label = label;
      this.name = name;
      this.description = description;
   }
}
