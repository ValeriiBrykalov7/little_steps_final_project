import createHttpError from "http-errors";
import { calculateWeek, calculateDays } from "../utils/pregnancy.js";
import { BabyState } from "../models/babyState.js";

// export const getPublicDashboardInfo = async (req,res)=>{
//   const week=calculateWeek(null);
//   const days=calculateDays(null,week);
//   const babyState= await BabyState.findOne({weekNumber: week});
//   if(!babyState){
//     throw createHttpError(404, "Дані не знайдено");
//   }
//   const tipOfTheDay=babyState.momDailyTips[0];
//   res.status(200).json({
//         currentWeek: week,
//         daysToMeeting: days,
//         baby: {
//           analogy: babyState.analogy,
//           size: babyState.babySize,
//           weight: babyState.babyWeight,
//           image: babyState.image,
//           description: babyState.babyDevelopment,
//           interestingFact: babyState.interestingFact
//         },
//         dailyAdvice: tipOfTheDay
//   });
// };

export const getPrivateDashbordInfo =async (req,res)=>{
 const user = req.user; // чекаю на mdlwr authenticate
  if (!user) {
      throw createHttpError(404, "Користувача не знайдено");
    }
  const week = calculateWeek(user.dueDate);
  const days = calculateDays(user.dueDate,week);
  const babyState = await BabyState.findOne({ weekNumber: week });
  if(!babyState){
    throw createHttpError(404, "Дані про цей тиждень не існують");
  }
    const dayIndex = new Date().getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    const tipOfTheDay = babyState.momDailyTips[adjustedIndex] || babyState.momDailyTips[0];
  res.status(200).json({
    data: {
        currentWeek: week,
        daysToMeeting: days,
        baby: {
          analogy: babyState.analogy,
          size: babyState.babySize,
          weight: babyState.babyWeight,
          image: babyState.image,
          description: babyState.babyDevelopment,
          interestingFact: babyState.interestingFact
        },
        dailyAdvice: tipOfTheDay
      }
  });
};
export const getBabyStateByWeek =async (req,res)=>{
    const {currentWeek}=req.params;
    const week = parseInt(currentWeek, 10);
    const babyState= await BabyState.findOne({
      weekNumber: week,
    });
    if(!babyState){
      throw createHttpError(404, "Дані за цей тиждень відсутні");
    }
    res.status(200).json(babyState);
};
