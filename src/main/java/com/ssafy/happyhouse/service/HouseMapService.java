package com.ssafy.happyhouse.service;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;
import com.ssafy.happyhouse.model.StoreDto;

public interface HouseMapService {
   
   List<SidoGugunCodeDto> getSido() throws Exception;
   List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception;
   List<HouseInfoDto> getDongInGugun(String gugun) throws Exception;
   List<HouseInfoDto> getAptInDong(String dong) throws Exception;
   List<StoreDto> getStoreInDong(String dong) throws Exception;
   List<HouseInfoDto> getDealcontents(Map<String,String> map) throws Exception;
   List<HouseInfoDto> getDealCount() throws Exception;
   void updateCntUp(HouseInfoDto houseinfoDto) throws Exception;
   int getCnt(Map<String,String> map) throws Exception;
   
   int getAvg(String dong) throws Exception;
   double getAptAvg(Map<String,String> map) throws Exception;
   List<HouseInfoDto> showChart(String aptName) throws Exception;
   
   
}