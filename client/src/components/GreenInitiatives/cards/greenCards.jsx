import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  MobileStepper,
  IconButton,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";
import { motion } from "framer-motion";

const InitiativeCard = ({ initiative }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = initiative.images.length;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStepChange = (step) => setActiveStep(step);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    outline: "none",
    borderRadius: "16px",
    maxWidth: 700,
    width: "90%",
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        borderRadius: "16px",
        boxShadow: 6,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {initiative.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
              alt="initiative"
              style={{
                height: 200,
                width: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
          sx={{
            position: "absolute",
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            width: "100%",
            px: 1,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {initiative.initiativeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {initiative.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          Type: {initiative.type}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Organization: {initiative.organization}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ mt: 1, cursor: "pointer" }}
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                initiative.location
              )}`,
              "_blank"
            )
          }
        >
          📍 {initiative.location}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          View
        </Button>
      </CardContent>

      <Modal open={open} onClose={handleClose}>
        <Box
          component={motion.div}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          sx={modalStyle}
        >
          <Typography variant="h6" gutterBottom>
            {initiative.initiativeName}
          </Typography>

          <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
            {initiative.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                alt="initiative"
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <IconButton
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <KeyboardArrowRight />
              </IconButton>
            }
            backButton={
              <IconButton
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
              </IconButton>
            }
            sx={{ mt: 1 }}
          />
          <Typography sx={{ mt: 2 }}>{initiative.description}</Typography>
          <Typography variant="caption" color="text.secondary">
            Impact: {initiative.impact}
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};

export default InitiativeCard;
