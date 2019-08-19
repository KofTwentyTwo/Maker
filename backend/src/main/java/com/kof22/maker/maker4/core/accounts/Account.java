package com.kof22.maker.maker4.core.accounts;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kof22.maker.maker4.cabinets.Project;
import lombok.Data;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
public class Account
{
   @Id @GeneratedValue
   private Long id;

   private String name;
   private String emailAddress;

   @OneToMany
   private List<Project> projects = new LinkedList<>();

   @Version @JsonIgnore
   private Long version;

   private Account()
   {
   }

   public Account(String name, String emailAddress)
   {
      this.name = name;
      this.emailAddress = emailAddress;
   }
}
