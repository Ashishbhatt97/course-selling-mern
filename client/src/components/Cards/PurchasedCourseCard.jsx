/* eslint-disable react/prop-types */
import { CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";

export function PurchasedCourseCard(props) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ display: "flex", flexDirection: "column" }}
        className="font-['Poppins'] flex flex-col max-w-[300px] p-5 rounded-lg shadow-lg "
      >
        <CardMedia
          style={{
            borderRadius: "15px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          sx={{ height: 140 }}
          image={props.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <h5 className="font-['Poppins'] mx-3 font-semibold font-regular text-gray-800 my-3">
          Price : ₹ {props.price}
        </h5>
        <button
          className="font-['Poppins'] mt-6 bg-black text-white w-full h-[45px] font-medium hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all"
          onClick={props.onClick}
        >
          {props.Btntitle}
        </button>
      </motion.div>
    );
  }