import { useState, useEffect } from 'react';
import '../scss/view-ticket.scss';

export default function ViewTicket({viewTicket, onSetViewTicket}) {

  const [allowEditName, setAllowEditName] = useState(false);
  const [ticketName, setTicketName] = useState(viewTicket?.name || '');

  useEffect(() => {
    setTicketName(viewTicket?.name || '');
  }, [viewTicket]);

  const handleAllowEditTicketName = () => {
    setAllowEditName(prev => !prev);
  }

  const handleEditTicketName = (value = '', type) => {
    if (type === 'editing') {
      setTicketName(() => value);
    } else if (type === 'saveOrCancelEdit') {
      if (value === 'Enter') {
        setAllowEditName(prev => !prev);
        // Handle save new ticket name
      } else if (value === 'Escape') {
        setAllowEditName(prev => !prev);
      }
    }
  }

  return (
      <div className={`view-ticket-overlay ${viewTicket ? `expand` : ''}`}>

        <div className='close-icon'>
          <i className='bi bi-x-lg' onClick={() => onSetViewTicket(() => false)}/>
        </div>
        {
          viewTicket &&
          <>
            <div className='ticket-name'>
              {allowEditName ?
                <input
                  autoFocus={true}
                  onChange={(e) => handleEditTicketName(e.target.value, 'editing')}
                  value={ticketName}
                  onKeyDown={(e) => handleEditTicketName(e.key, 'saveOrCancelEdit')}
                /> :
                <h4 onClick={handleAllowEditTicketName}>{viewTicket.name}</h4>
              }
            </div>
            <div className='ticket-description'>

            </div>
          </>
        }
      </div>
  )
}