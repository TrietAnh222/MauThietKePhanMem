
import React from 'react';

export default function FooterComponent() {
  return (
    
      <div className='text-center p-3' style={{ backgroundColor: '', textAlign:'center', padding:'5px' ,color:'black', fontWeight:'bold', fontSize:'15px'}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='http://localhost:3000/' style={{color:'black'}}>
          huflitbook.com
        </a>
      </div>
    
  );
}