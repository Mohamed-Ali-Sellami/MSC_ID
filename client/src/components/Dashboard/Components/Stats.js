import React from 'react';
import { useSelector } from 'react-redux';

function Stats() {

  const cars=useSelector((store)=>store.car?.car)
  const clients = useSelector((store) => store.client?.client);
  return (
    <div className="statsdash">
      <div className="stat-carddash">
        <h3>Users</h3>
        <p>{clients?.length}</p>
        <p className="negativedash">-8%</p>
      </div>
     
      <div className="stat-carddash">
        <h3>Income</h3>
        <p>$2,000</p>
        <p className="positivedash">+24%</p>
      </div>
      <div className="stat-carddash">
        <h3>Expenses</h3>
        <p>$425</p>
        <p className="negativedash">-10%</p>
      </div>
    </div>
  );
}

export default Stats;