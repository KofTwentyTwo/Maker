package com.kof22.maker.maker4.cabinets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kof22.maker.maker4.core.accounts.Account;
import lombok.Data;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
public class Project
{
   @Id @GeneratedValue
   private Long id;

   private String label;
   private String name;
   private String description;

   @ManyToOne
   private Account account;

   @OneToMany(fetch = FetchType.EAGER)
   private List<ProjectGroup> projectGroups = new LinkedList<>();

   @Version @JsonIgnore
   private Long version;

   private Project()
   {
   }

   public Project(String label, String name, String description, Account account)
   {
      this.label = label;
      this.name = name;
      this.description = description;
      this.account = account;
   }
}
