package com.kof22.maker.maker4.core.security;

import com.kof22.maker.maker4.core.accounts.Account;


@lombok.Data
@javax.persistence.Entity
public class Token
{
   @javax.persistence.Id @javax.persistence.GeneratedValue
   private Long id;

   private String value = null;
   private Boolean isValid = false;

   @javax.persistence.ManyToOne
   private Account account = null;

   @javax.persistence.Version @com.fasterxml.jackson.annotation.JsonIgnore
   private Long version;

   private Token()
   {
   }

   public Token(String value, Account account, Boolean isValid)
   {
      this.value = value;
      this.account = account;
      this.isValid = isValid;
   }
}
