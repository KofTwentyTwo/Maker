package com.kof22.maker.maker4;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Maker4Controller
{
   @RequestMapping(value = "/")
   public String index()
   {
      return "index";
   }
}
