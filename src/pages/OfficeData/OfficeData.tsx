/** @jsxImportSource @emotion/react */
import Typography from "@mui/material/Typography";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OFFICE_DATA, Data as OfficeDataType } from "./gql/officeDataQuery";
import { OFFICE_PRICING, Data as OfficePricing } from "./gql/officePricingQuery";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { css } from "@emotion/react";
import TableHead from "@mui/material/TableHead";
import { OFFICE_RENTINGS, Data as OfficeRentings } from "./gql/officeRentingsQuery";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { OFFICE_BOOKINGS, Data as OfficeBookings } from "./gql/officeBookingsQuery";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";

type Event = { title: string; start: string; end: string; allDay: boolean; backgroundColor?: string };

function OfficeData() {
  const { id } = useParams();
  const parsedId = parseInt(id as string, 10);
  const [topTabIndex, setTopTabIndex] = useState<number>(0);
  const [bottomTabIndex, setBottomTabIndex] = useState<number>(0);
  const { data: officeData } = useQuery<OfficeDataType>(OFFICE_DATA, { variables: { id: parsedId } });
  const { data: officePricing } = useQuery<OfficePricing>(OFFICE_PRICING, { variables: { id: parsedId } });
  const { data: officeRentings } = useQuery<OfficeRentings>(OFFICE_RENTINGS, { variables: { id: parsedId } });
  const { data: officeBookings } = useQuery<OfficeBookings>(OFFICE_BOOKINGS, { variables: { id: parsedId } });
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const e: Event[] = [];

    officeRentings?.rentings.forEach((renting) =>
      e.push({
        title: `Rented by ${renting.user.firstname} ${renting.user.lastname}`,
        start: new Date(parseInt(renting.start, 10)).toISOString(),
        end: new Date(parseInt(renting.end, 10)).toISOString(),
        allDay: true,
        backgroundColor: "#2e7d32",
      })
    );

    officeBookings?.bookings.forEach((booking) =>
      e.push({
        title: `Booked by ${booking.user.firstname} ${booking.user.lastname}`,
        start: new Date(parseInt(booking.start, 10)).toISOString(),
        end: new Date(parseInt(booking.end, 10)).toISOString(),
        allDay: false,
      })
    );

    setEvents(e);
  }, [officeRentings, officeBookings]);

  return (
    <Layout>
      <Typography variant="h4">Office #{id}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={topTabIndex} onChange={(_, newValue: number) => setTopTabIndex(newValue)}>
          <Tab label="Basic data" />
          <Tab label="Items" />
          <Tab label="Services" />
          <Tab label="Prices" />
        </Tabs>
      </Box>

      {topTabIndex === 0 && <BasicData officeData={officeData}></BasicData>}
      {topTabIndex === 1 && <Items officeData={officeData}></Items>}
      {topTabIndex === 2 && <Services officeData={officeData}></Services>}
      {topTabIndex === 3 && <Prices officePricing={officePricing}></Prices>}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={bottomTabIndex} onChange={(_, newValue: number) => setBottomTabIndex(newValue)}>
          <Tab label="Rentings" />
          <Tab label="Bookings" />
          <Tab label="Calendar" />
        </Tabs>
      </Box>

      {bottomTabIndex === 0 && <Rentings buildingId={officeData?.office.building.id} officeId={id} officeRentings={officeRentings}></Rentings>}
      {bottomTabIndex === 1 && <Bookings buildingId={officeData?.office.building.id} officeId={id} officeBookings={officeBookings}></Bookings>}
      {bottomTabIndex === 2 && (
        <Box sx={{ backgroundColor: "white", padding: "15px" }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            firstDay={1}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={events}
          />
        </Box>
      )}
    </Layout>
  );
}

function BasicData(props: { officeData: OfficeDataType | undefined }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">ID</TableCell>
              <TableCell>{props.officeData?.office.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Building</TableCell>
              <TableCell>{props.officeData?.office.building.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Floor</TableCell>
              <TableCell>{props.officeData?.office.floor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Office number</TableCell>
              <TableCell>{props.officeData?.office.office_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Size</TableCell>
              <TableCell>{props.officeData?.office.size} m2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Items(props: { officeData: OfficeDataType | undefined }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Pieces</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.officeData?.office.items.map((item) => (
              <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{item.id}</TableCell>
                <TableCell>{item.item.name}</TableCell>
                <TableCell>{item.pieces}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Services(props: { officeData: OfficeDataType | undefined }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.officeData?.office.services.map((service) => (
              <TableRow key={service.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Prices(props: { officePricing: OfficePricing | undefined }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Time unit</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.officePricing?.officePricings.map((pricing) => (
              <TableRow key={pricing.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{pricing.id}</TableCell>
                <TableCell>{pricing.unit_price} HUF</TableCell>
                <TableCell>{pricing.time_unit.name}</TableCell>
                <TableCell>{new Date(parseInt(pricing.created_at, 10)).toLocaleString("hu-HU")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Rentings(props: { officeRentings: OfficeRentings | undefined; buildingId: number | undefined; officeId: string | undefined }) {
  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.officeRentings?.rentings.map((renting) => (
              <TableRow key={renting.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{renting.id}</TableCell>
                <TableCell>{`${renting.user.firstname} ${renting.user.lastname}`} </TableCell>
                <TableCell>{new Date(parseInt(renting.start, 10)).toLocaleDateString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(renting.end, 10)).toLocaleDateString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(renting.created_at, 10)).toLocaleString("hu-HU")}</TableCell>
                <TableCell>
                  <Tooltip title="Open">
                    <IconButton color="primary" aria-label="open" component="span" onClick={() => navigate(`/renting/${renting.id}`)}>
                      <OpenInNew />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button component={Link} to={`/rentings/create/${props.buildingId}/${props.officeId}`} variant="contained" color="success">
          Create renting
        </Button>
      </Box>
    </>
  );
}

function Bookings(props: { officeBookings: OfficeBookings | undefined; buildingId: number | undefined; officeId: string | undefined }) {
  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.officeBookings?.bookings.map((booking) => (
              <TableRow key={booking.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell>{`${booking.user.firstname} ${booking.user.lastname}`} </TableCell>
                <TableCell>{new Date(parseInt(booking.start, 10)).toLocaleString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(booking.end, 10)).toLocaleString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(booking.created_at, 10)).toLocaleString("hu-HU")}</TableCell>
                <TableCell>
                  <Tooltip title="Open">
                    <IconButton color="primary" aria-label="open" component="span" onClick={() => navigate(`/booking/${booking.id}`)}>
                      <OpenInNew />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button component={Link} to={`/bookings/create/${props.buildingId}/${props.officeId}`} variant="contained" color="success">
          Create booking
        </Button>
      </Box>
    </>
  );
}

export default OfficeData;
