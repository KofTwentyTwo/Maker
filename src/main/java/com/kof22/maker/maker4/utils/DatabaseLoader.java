package com.kof22.maker.maker4.utils;

import com.kof22.maker.maker4.cabinets.*;
import com.kof22.maker.maker4.core.accounts.Account;
import com.kof22.maker.maker4.core.accounts.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner
{

   private final MaterialTypeRepository materialTypeRepository;
   private final AccountRepository accountRepository;
   private final ProjectRepository projectRepository;
   private final ProjectGroupRepository projectGroupRepository;
   private final MaterialRepository materialRepository;
   private final CabinetRepository cabinetRepository;

   @Autowired
   public DatabaseLoader(MaterialTypeRepository materialTypeRepository, AccountRepository accountRepository, ProjectRepository projectRepository, ProjectGroupRepository projectGroupRepository, MaterialRepository materialRepository, CabinetRepository cabinetRepository)
   {
      this.materialTypeRepository = materialTypeRepository;
      this.accountRepository = accountRepository;
      this.projectRepository = projectRepository;
      this.projectGroupRepository = projectGroupRepository;
      this.materialRepository = materialRepository;
      this.cabinetRepository = cabinetRepository;
   }

   @Override
   public void run(String... strings) throws Exception
   {
      /////////////////////////
      // Build some Accounts //
      /////////////////////////
      Account account = this.accountRepository.save(new Account("James Maes", "james@kof22.com"));

      //////////////////////////////////////////
      // Build some Projects for this account //
      //////////////////////////////////////////
      Project p1 = this.projectRepository.save(new Project("908STATE-K", "908 State St Kitchen", "Kitchen Cabinets for 908 State St, Chester IL", account));
      Project p2 = this.projectRepository.save(new Project("908STATE-B", "908 State St Downstairs Bar", "Bar Cabinets for 908 State St, Chester IL", account));

      ///////////////////////////////////////////////////////
      // Build some of the project groups for this project //
      ///////////////////////////////////////////////////////
      ProjectGroup pg1 = this.projectGroupRepository.save(new ProjectGroup("Island", p1));
      ProjectGroup pg2 = this.projectGroupRepository.save(new ProjectGroup("Stove", p1));

      //////////////////////////
      // Build Material Types //
      //////////////////////////
      MaterialType sheets = this.materialTypeRepository.save(new MaterialType("SHEET", "Plywood Sheets", "Standard Plywood sheets"));
      MaterialType hardwood = this.materialTypeRepository.save(new MaterialType("HARDWOOD", "Hardwood", "Hardwood Boards, Oak, Cherry, etc.."));
      MaterialType softwood = this.materialTypeRepository.save(new MaterialType("SOFTWOOD", "Softwood", "Softwood Boards, Pine, Fir, etc.."));

      //////////////////////////////
      // Build some Materials now //
      //////////////////////////////
      Material plywoodOak19mm = this.materialRepository.save(new Material("OAKSHEET19MM", "Oak Plywood 3/4'' / 19mm", "Oak Plywood Sheet.  4'x8' 3/4'' (19mm)", 48.0, 96.0, .75, 1219.0, 2438.0, 19.0, sheets));
      Material plywoodOak13mm = this.materialRepository.save(new Material("OAKSHEET13MM", "Oak Plywood 1/2'' / 13mm", "Oak Plywood Sheet.  4'x8' 1/2'' (13mm)", 48.0, 96.0, .5, 1219.0, 2438.0, 13.0, sheets));
      Material plywoodOak6mm = this.materialRepository.save(new Material("OAKSHEET6MM", "Oak Plywood 1/4'' / 6mm", "Oak Plywood Sheet.  4'x8' 1/4'' (6mm)", 48.0, 96.0, .25, 1219.0, 2438.0, 6.0, sheets));

      ///////////////////////////////////////////////
      // Finally - lets build some of our Cabinets //
      ///////////////////////////////////////////////
      Cabinet c1 = new Cabinet("ISLAND", "Kitchen Island", "Kitchen Island Large Cabinet");
      c1.addPossibleMaterial(plywoodOak6mm).addPossibleMaterial(plywoodOak19mm);
      this.cabinetRepository.save(c1);
      pg1.getCabinets().add(c1);
      this.projectGroupRepository.save(pg1);

      Cabinet c2 = new Cabinet("STOVE-B18-LEFT", "18 Base / Stove Left", "18'' Base Cabinet, Left of Stove");
      c2.addPossibleMaterial(plywoodOak6mm).addPossibleMaterial(plywoodOak19mm);
      this.cabinetRepository.save(c2);
      pg2.getCabinets().add(c2);

      Cabinet c3 = new Cabinet("STOVE-B18-RIGHT", "18 Base / Stove Right", "18'' Base Cabinet, Right of Stove");
      c3.addPossibleMaterial(plywoodOak13mm).addPossibleMaterial(plywoodOak19mm);
      this.cabinetRepository.save(c3);
      pg2.getCabinets().add(c3);

      this.projectGroupRepository.save(pg2);
   }
}












