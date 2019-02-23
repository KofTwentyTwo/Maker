package com.kof22.maker.maker4.cabinets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kof22.maker.maker4.core.accounts.Account;
import lombok.Data;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class ProjectGroup
{
   @Id @GeneratedValue
   private Long id;

   private String name;

   @ManyToOne private Project project;

   @OneToMany
   private List<Cabinet> cabinets = new LinkedList<>();

   @Version @JsonIgnore
   private Long version;

   private ProjectGroup()
   {
   }

   public ProjectGroup(String name, Project project)
   {
      this.name = name;
      this.project = project;
   }
}
