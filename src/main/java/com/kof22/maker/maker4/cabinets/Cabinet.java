package com.kof22.maker.maker4.cabinets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
public class Cabinet
{
   @Id @GeneratedValue
   private Long id;

   private String label;
   private String name;
   private String description;

   @ManyToMany(fetch = FetchType.EAGER)
   private List<Material> possibleMaterials = new LinkedList<>();

   @Version @JsonIgnore
   private Long version;

   private Cabinet()
   {
   }

   public Cabinet(String label, String name, String description)
   {
      this.label = label;
      this.name = name;
      this.description = description;
   }

   public Cabinet addPossibleMaterial(Material material)
   {
      this.getPossibleMaterials().add(material);
      return (this);
   }
}
