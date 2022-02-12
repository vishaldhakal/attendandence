import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";

export default function Dashboard() {
  return (
    <>
      <Navbar showw="d-block" />
    </>
  );
}
