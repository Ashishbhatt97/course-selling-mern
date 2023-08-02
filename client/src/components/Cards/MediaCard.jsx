/* eslint-disable react/prop-types */
import { CardMedia } from "@mui/material";
import { motion } from "framer-motion";

export const MediaCard = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="font-['Poppins'] flex flex-col  max-w-[300px] p-3 rounded-lg shadow-lg"
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
      <div className="p-4 drop-shadow-lg">
        <div>
          <h5 className="font-medium">{props.title}</h5>
        </div>
        <div>
          <h5 className="font-light text-[14px] text-black/50 mt-2">
            {props.description}
          </h5>
        </div>
        <div>
          <h5 className="font-['Poppins']  font-bold gilroy-regular text-gray-800 my-3">
            Price : ₹ {props.price}
          </h5>
        </div>
        <div>
          <motion.button
            className="font-['Poppins']   bg-black text-white w-[120px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-2xl transition-all"
            onClick={props.onClick}
          >
            {props.Btntitle}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
