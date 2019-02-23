'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component
{

   constructor(props)
   {
      super(props);
      this.state = {materialTypes: [], accounts: []};
   }

   componentDidMount()
   {
      client({method: 'GET', path: '/api/materialTypes'}).done(response =>
      {
         this.setState({materialTypes: response.entity._embedded.materialTypes});
      });

      client({method: 'GET', path: '/api/accounts'}).done(response =>
      {
         this.setState({accounts: response.entity._embedded.accounts});
      });
   }

   render()
   {
      return (
         <div>
            <MaterialTypeList materialTypes={this.state.materialTypes}/>
            <Accounts accounts={this.state.accounts}/>
         </div>
      )
   }
}

// end::app[]

class Accounts extends React.Component
{
   render()
   {
      const account = this.props.accounts.map(account =>
         <Account key={account._links.self.href} account={account}/>
      );
      return (
         <div>
            <h2>Accounts </h2>
            <table>
               <tbody>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email Address</th>
               </tr>
               {account}
               </tbody>
            </table>
         </div>
      )
   }
}

class Account extends React.Component
{
   render()
   {
      return (
         <tr>
            <td>{this.props.account.id}</td>
            <td>{this.props.account.name}</td>
            <td>{this.props.account.emailAddress}</td>
         </tr>
      )
   }
}

// tag::materialType-list[]
class MaterialTypeList extends React.Component
{
   render()
   {
      const materialType = this.props.materialTypes.map(materialType =>
         <MaterialType key={materialType._links.self.href} materialType={materialType}/>
      );
      return (
         <div>
            <h2>Material Types</h2>
            <table>
               <tbody>
               <tr>
                  <th>Label</th>
                  <th>Name</th>
                  <th>Description</th>
               </tr>
               {materialType}
               </tbody>
            </table>
         </div>
      )
   }
}

// end::materialType-list[]

// tag::materialType[]
class MaterialType extends React.Component
{
   render()
   {
      return (
         <tr>
            <td>{this.props.materialType.label}</td>
            <td>{this.props.materialType.name}</td>
            <td>{this.props.materialType.description}</td>
         </tr>
      )
   }
}

// end::materialType[]

// tag::render[]
ReactDOM.render(
   <App/>,
   document.getElementById('react')
)
// end::render[]
