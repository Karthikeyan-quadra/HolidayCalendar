// import * as React from 'react';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// import { useEffect, useState } from "react";
// import { MSGraphClientV3 } from "@microsoft/sp-http";
// import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
// import { ICalendarProps } from './ICalendarProps';



// export default function Calendar(props:ICalendarProps) {
//   const customStyle = `
//   .fc .fc-button-primary {
//     background-color: #EA881A;
//     border-color: #EA881A;
//     width: 45px;
//  }

//  .fc-toolbar-chunk {
//   display: flex;
//  }

//  :root{
//   --fc-button-hover-bg-color: #EA881A;
// --fc-button-hover-border-color: #EA881A;
// --fc-button-active-bg-color: #EA881A;
// --fc-button-active-border-color: #EA881A;
// --fc-today-bg-color: transparent;
//  }

//  .fc .fc-daygrid-day-top {
//     display: flex;
//     flex-direction: row;
//   }

//   .fc-theme-standard .fc-scrollgrid {
//     border: none !important;
// }

//   .fc-scrollgrid-section-body td {
//       border-bottom: none !important;
//       border-right: none !important;
//     }
 
//     .fc-theme-standard th {
//       border-right: none;
//   }

//   .fc-header-toolbar .fc-toolbar-chunk:first-child::before {
//     content: "Holiday Calendar";
//     color: #000;
//     font-size: 24px;
//     font-weight: 600;
   
//   }
//   `

//   const [events, setEvents] = useState<MicrosoftGraph.Event[]>([]);

//   useEffect(() => {
//     props.context.msGraphClientFactory
//       .getClient("3")
//       .then((client: MSGraphClientV3) => {
//         client
//           .api("me/calendars/AAMkADM3MmVlNTNiLTU3NDUtNDhkZC04YzVmLTU0YTRkY2QyYTk0YgBGAAAAAAD-YqeVJi81S6T060dKLj7eBwANhm4-q9BpTpYm61BewISXAAAAAAEGAAANhm4-q9BpTpYm61BewISXAAAAAJJWAAA=/events")
//           .version("v1.0")
//           .select("*")
//           .get((error: any, eventsResponse, rawResponse?: any) => {
//             if (error) {
//               console.error("Message is: " + error);
//               return;
//             }

//             const calendarEvents: MicrosoftGraph.Event[] = eventsResponse.value;
//             setEvents(
//               calendarEvents.map((event) => ({
//                 ...event,
//               }))
//             );
              
//             console.log("CalendarEvents", calendarEvents);

//           });
//       });
//   }, [props.context.msGraphClientFactory]);

//   const eventContent = (eventInfo: any) =>{
//     const eventSubject = eventInfo.event.extendedProps.subject;
//     return(
//       <>
//       <div>{eventSubject}</div>
//       </>
//     )
//   }
//     return (
//       <>
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left:"",
//           right:"title prev,next",
//         }}
//         dayHeaderFormat={{weekday: "long"}}
//         buttonText={{
//           prev:"<",
//           next:">",
//         }}
//    events={events.map((event: any) => ({
//           title: event.subject,
//           start: new Date(event.start.dateTime),
//           end: new Date(event.end.dateTime),
//           extendedProps: { subject: event.subject },
//         }))}
//         eventContent= {eventContent}
//       />
//       <style>
//         {customStyle}
//       </style>
//       </>
//     )
//   }


import * as React from "react";
import { useEffect, useState } from "react";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import type { ICalendarProps } from "./ICalendarProps";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Calendar.module.scss";
 
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";
 
// interface IFormattedEvent {
//   subject: string;
//   startDate: string;
//   endDate: string;
//   startTime: string;
//   endTime: string;
//   eventDate: string;
//   bodyPreview?: string;
//   joinUrl?: string;
// }
 
const Calendar = (props: ICalendarProps) => {
  var customStyles = `
 
     .fc .fc-button-primary {
        background-color: #EA881A;
        border-color: #EA881A;
        width: 45px;
     }
 
     .fc-toolbar-chunk {
      display: flex;
     }
 
     :root{
      --fc-button-hover-bg-color: #EA881A;
    --fc-button-hover-border-color: #EA881A;
    --fc-button-active-bg-color: #EA881A;
    --fc-button-active-border-color: #EA881A;
    --fc-today-bg-color: transparent;
     }
 
     .fc .fc-daygrid-day-top {
        display: flex;
        flex-direction: row;
      }
 
      .fc-theme-standard .fc-scrollgrid {
        border: none !important;
    }
 
    .fc-scrollgrid-section-body td {
      border-bottom: none !important;
      border-right: none !important;
    }
 
    .fc-theme-standard th {
      border-right: none;
  }
 
  .fc-header-toolbar .fc-toolbar-chunk:first-child::before {
    content: "Holiday Calendar";
    color: #000;
    font-size: 24px;
    font-weight: 600;
   
  }
 
  .fc .fc-daygrid-event {
 
    top: 30px;
}
 
  .fc-event:hover {
    background: none;
   }
 
  `;
 
  const [holidays, setHolidays] = useState<MicrosoftGraph.Event[]>([]);
 
  useEffect(() => {
    props.context.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3) => {
        client
          .api('/me/calendars/AAMkADM3MmVlNTNiLTU3NDUtNDhkZC04YzVmLTU0YTRkY2QyYTk0YgBGAAAAAAD-YqeVJi81S6T060dKLj7eBwANhm4-q9BpTpYm61BewISXAAAAAAEGAAANhm4-q9BpTpYm61BewISXAABDUF3AAAA=/events')
          .version("v1.0")
          .select("*")
          .get((error: any, eventsResponse, rawResponse?: any) => {
            if (error) {
              console.error("Message is: " + error);
              return;
            }
 
            const holidayEvents: MicrosoftGraph.Event[] = eventsResponse.value;
            setHolidays(holidayEvents);
          });
      });
  }, [props.context.msGraphClientFactory]);
 
  console.log(holidays);
 
  const eventContent = (info: any) => {
    const eventSubject = info.event.extendedProps.subject;
    return (
      <>
        <div className={styles.title}>{eventSubject}</div>
      </>
    );
  };
 
  return (
    <>
      <style>{customStyles}</style>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "",
          right: "title prev,next",
        }}
        dayHeaderFormat={{ weekday: "long" }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        events={holidays.map((event: any) => ({
          title: event.subject,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          extendedProps: { subject: event.subject },
        }))}
        eventContent={eventContent}
      />
    </>
  );
};
 
export default Calendar;