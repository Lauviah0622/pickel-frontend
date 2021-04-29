import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Sidebar from "./Sidebar";

import Modal from "../../components/Modal";

const EventContainer = styled.div``;

const TestButton = styled.button``;

export default function Event() {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const { status } = useSelector((store) => store.statusState);

  // 離開視窗提醒
  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  useEffect(() => {
    if (status !== "client") {
      // 一定要有 entry 設定的 client 才可以近來
      history.push("/");
    }
  }, [status, history]);

  // 設定離開的彈跳視窗，這邊還沒有深究
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <EventContainer>
      <Sidebar handleModalOpen={handleModalOpen} />
        
        <Modal
          open={open}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
        />
        <TestButton onClick={handleModalOpen}>123123</TestButton>
      </EventContainer>
    </>
  );
}
