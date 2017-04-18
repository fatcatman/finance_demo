package org.andy.work.Util;

import com.dcits.business.event.EventService;

import java.util.Map;

/**
 * Created by FuChuan7 on 2016-09-19.
 */
public class WebService {
    public static String queryEventInfoForShow(String eventCode, String showType) {
        EventService eventService = ServiceUtil.getSupportService().getEventService();//事项信息服务
        String resultInfo = "";
        try {
            resultInfo = eventService.queryEventInfoForShow(eventCode, showType);
            Map<String, String> map = ReadStringXml.getEventInfo(resultInfo);
            return map.get("eventInfo");
        } catch (Throwable e) {

        }
       return null;
    }

    public static String callQueuing(String eventCode, String showType) {
//        EventService eventService = ServiceUtil.getSupportService().getEventService();//事项信息服务
//        String resultInfo = "";
//        try {
//            resultInfo = eventService.call(eventCode, showType);
//            Map<String, String> map = ReadStringXml.getEventInfo(resultInfo);
//            return map.get("eventInfo");
//        } catch (Throwable e) {
//
//        }
        return null;
    }
}
