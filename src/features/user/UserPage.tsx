import ActionMenu from "../../components/generics/ActionMenu";
import { TableComponent } from "../../components/generics/TableComponent";
import NavBar from "../../components/navBar/NavBar";


function UserPage() {

    const UserColumn = [
        {
          name: 'UserName', // TODO use textConstant
          selector: (row: { name: string }) => row.name,
        },
        {
          name: 'Email', // TODO align text center
          selector: (row: { email: string }) => row.email ?? '-',
        },
        
        {
          name: 'Role', // TODO use textConstant
          selector: (row: { role: string }) => row.role ?? '-',
        },
        {
          button: true,
          cell: (row: { id: string }) => (
            <ActionMenu viewRoute={''} /> // TODO use textConstant
          ),
        },
      ];

      const data = [
        {
          name: 'User 1',
          email: 'user@gmail.com',
          role: 'Admin',
          
        },
        {
            name: 'User 2',
            email: 'user2@gmail.com',
            role: 'Member',
            
          },
      
          {
            name: 'User 3',
            email: 'user3@gmail.com',
            role: 'Admin',
            
          },
          {
            name: 'User 4',
            email: 'user4@gmail.com',
            role: 'Member',
            
          },
      ];
      
 
  return (
    <>
     <NavBar elevation={0} />

     <div className="mt-5 mx-4">
   
        <TableComponent
          data={data}
          columns={UserColumn}
         
          isExpanded={false}
          title='Users List' // TODO use textConstant
          extraStyle='p-3'
          
          pendingMessage={'Loading Users...'}
    
         
        />
        {/* {!status.includes('pending') ? ( */}
       
        {/* ) : null} */}
     

     </div>
    
    </>
 
  );
}

export default UserPage;
