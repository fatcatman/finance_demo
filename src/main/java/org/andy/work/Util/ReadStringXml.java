package org.andy.work.Util;

import org.apache.log4j.Logger;
import org.dom4j.*;
import org.dom4j.io.SAXReader;

import java.util.*;

/**
 * 解析xml字符串
 * 
 * @ClassName:ReadStringXmlf
 * @Description:TODO
 * @Author:h8wangjiabao
 * @date:2014-10-9
 * @UpdateUser:h8wangjiabao
 * @UpdateDate:2014-10-9 下午4:15:23
 * @UpdateRemark:What is modified?
 */
public class ReadStringXml {

	private static final String xmltop = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
	private static final String xmltopRoot = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><root>";
	private static final String xmlbottom = "</root>";
	public static final String XMLTEXT = "xmlText";
	public static final String PATH = "path";
	public static final Logger logger = Logger.getLogger("forFATAL");


	/**
	 * 封装用户信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getUserList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Element resultInfo = (Element) root.elementIterator("resultInfo")
					.next();
			List<Element> systemCode = resultInfo.elements();
			for (Element ss : systemCode) {
				if (ss.getName().equals("systemCode")) {
					String sss = ss.getTextTrim();
					if (sss.equals("1000")) {
						Element userInfos = (Element) root.elementIterator(
								"userInfos").next();
						List<Element> users = userInfos.elements();
						for (Element user : users) {
							List<Element> infos = user.elements();
							Map<String, String> map = new HashMap<String, String>();
							for (Element info : infos) {
								map.put(info.getName(), info.getTextTrim());
							}
							list.add(map);
						}
					}
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装人口信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getPopulationList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator resIt = root.elementIterator("ResponseData");
			if (!resIt.hasNext()) {
				return list;
			}
			Element ResponseData = (Element) root.elementIterator(
					"ResponseData").next();
			Iterator peoIt = ResponseData.elementIterator("Peoples");
			if (!peoIt.hasNext()) {
				return list;
			}
			Element Peoples = (Element) ResponseData.elementIterator("Peoples")
					.next();
			List<Element> people = Peoples.elements();
			for (Element item : people) {
				List<Element> infos = item.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装部门列表信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getDeptList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator insIt = root.elementIterator("institutions");
			if (!insIt.hasNext()) {
				return list;
			}
			Element institutions = (Element) root.elementIterator(
					"institutions").next();
			List<Element> depts = institutions.elements();
			for (Element dept : depts) {
				List<Element> infos = dept.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装部门详细信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getDeptListInfo(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator inIt = root.elementIterator("institution");
			if (!inIt.hasNext()) {
				return list;
			}
			while (inIt.hasNext()) {
				Element dept = (Element) inIt.next();
				List<Element> infos = dept.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装已经启用的事项信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getMatterList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Element MatterInfos = (Element) root.elementIterator("MatterInfos")
					.next();
			List<Element> matters = MatterInfos.elements();
			for (Element matter : matters) {
				List<Element> infos = matter.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装岗位列表信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getPostList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator postIt = root.elementIterator("positionInfos");
			if (!postIt.hasNext()) {
				return list;
			}
			Element positionInfos = (Element) root.elementIterator(
					"positionInfos").next();
			List<Element> posts = positionInfos.elements();
			for (Element post : posts) {
				List<Element> infos = post.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装角色列表信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getRoleList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator roleIt = root.elementIterator("roleInfos");
			if (!roleIt.hasNext()) {
				return list;
			}
			Element roleInfos = (Element) root.elementIterator("roleInfos")
					.next();
			List<Element> roles = roleInfos.elements();
			for (Element role : roles) {
				List<Element> infos = role.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装资源列表信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getRescList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator rescIt = root.elementIterator("resourceInfos");
			if (!rescIt.hasNext()) {
				return list;
			}
			Element rescInfos = (Element) root.elementIterator("resourceInfos")
					.next();
			List<Element> rescs = rescInfos.elements();
			for (Element resc : rescs) {
				List<Element> infos = resc.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装权限信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getRoleRescList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator autIt = root.elementIterator("authorityInfos");
			if (!autIt.hasNext()) {
				return list;
			}
			Element authorityInfos = (Element) root.elementIterator(
					"authorityInfos").next();
			Iterator modIt = authorityInfos.elementIterator("models");
			if (!modIt.hasNext()) {
				return list;
			}
			Element models = (Element) authorityInfos.elementIterator("models")
					.next();
			List<Element> people = models.elements();
			for (Element item : people) {
				List<Element> infos = item.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装代办列表信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getAgencyMatterList(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);// 将String类型的参数转换成doc
			Element root = doc.getRootElement();// 出去所有的element（节点、子项）
			if (!"matters".equals(root.getName())) {
				return list;
			}
			List<Element> matters = root.elements();
			for (Element matter : matters) {
				List<Element> infos = matter.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装双屏调用结果信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> getDbScreenResult(String xmlStr) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			List<Element> resuleInfos = root.elements();
			for (Element info : resuleInfos) {
				map.put(info.getName(), info.getTextTrim());
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * 封装大屏已发布公告信息列表
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, List<Map<String, String>>>> getNotifysList(
			String xmlStr) {
		List<Map<String, List<Map<String, String>>>> list = new ArrayList<Map<String, List<Map<String, String>>>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Iterator snIt = root.elementIterator("ScreenNotifyInfo");
			if (!snIt.hasNext()) {
				return list;
			}
			Element ScreenNotifyInfo = (Element) root.elementIterator(
					"ScreenNotifyInfo").next();
			Iterator temIt = ScreenNotifyInfo.elementIterator("Template");
			if (!temIt.hasNext()) {
				return list;
			}
			List<Element> Templates = ScreenNotifyInfo.elements();
			for (Element item : Templates) {
				Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
				List<Map<String, String>> notifysList = new ArrayList<Map<String, String>>();

				Element TemplateId = (Element) item.elementIterator(
						"TemplateId").next();

				Element Notifys = (Element) item.elementIterator("Notifys")
						.next();
				List<Element> notifys = Notifys.elements();
				for (Element notify : notifys) {
					List<Element> infos = notify.elements();
					Map<String, String> itemMap = new HashMap<String, String>();
					for (Element info : infos) {
						itemMap.put(info.getName(), info.getTextTrim());
					}
					notifysList.add(itemMap);
				}
				map.put(TemplateId.getTextTrim(), notifysList);
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装大屏发布公告模板
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getNotifyTemplate(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Element ScreenTemplateInfo = (Element) root.elementIterator(
					"ScreenTemplateInfo").next();
			List<Element> Templates = ScreenTemplateInfo.elements();
			for (Element template : Templates) {
				List<Element> infos = template.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装所有设备ID
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, String>> getEquipment(String xmlStr) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Element ScreenTemplateInfo = (Element) root.elementIterator(
					"EquipmentInfo").next();
			List<Element> Equipments = ScreenTemplateInfo.elements();
			for (Element equipment : Equipments) {
				List<Element> infos = equipment.elements();
				Map<String, String> map = new HashMap<String, String>();
				for (Element info : infos) {
					map.put(info.getName(), info.getTextTrim());
				}
				list.add(map);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 封装办事指南信息
	 * 
	 * @param xmlStr
	 *            xml字符串
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> getEventInfo(String xmlStr) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Document doc = DocumentHelper.parseText(xmlStr);
			Element root = doc.getRootElement();
			Element showEventInfo = (Element) root.elementIterator(
					"showEventInfo").next();
			List<Element> infos = showEventInfo.elements();
			for (Element info : infos) {
				map.put(info.getName(), info.getTextTrim());
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return map;
	}



	/**
	 * 将xml文件或者xml字符串解析成List<Map<String,String> key转成了小写字符
	 * 
	 * @param pathOrstr
	 *            路径或者xml文本
	 * @param type
	 *            =path 表示传入的是一个路径 type=xmlText 表示传入的是一个文本
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Map<String, String>> getXMLMapList(String pathOrstr,
			String type) {
		SAXReader reader = new SAXReader();
		List<Map<String, String>> listMap = null;
		try {
			Document doc = null;
			if (PATH.equals(type)) {
				doc = reader.read(pathOrstr);
			} else if (XMLTEXT.equals(type)) {
				doc = DocumentHelper.parseText(pathOrstr);
			} else {
				throw new RuntimeException("请传入正确的参数");
			}
			Element root = doc.getRootElement();// 获取根节点,这里可以修改成任意的某个节点
			listMap = new ArrayList<Map<String, String>>();
			List<Element> elements = root.elements();
			if (null != elements && elements.size() > 0) {
				for (Element e : elements) {// 遍历根节点下的第一级节点
					Map<String, String> map = new HashMap<String, String>();
					for (Iterator attIt = e.attributeIterator(); attIt
							.hasNext();) {// 遍历节点中的属性
						Attribute attr = (Attribute) attIt.next();
						map.put(attr.getName().toLowerCase(), attr.getText());// 将属性名和属性值封装到map中
					}
					listMap.add(map);
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return listMap;
	}


	public void readStringXml(String xml) {
		Document doc = null;
		try {
			// 读取并解析XML文档
			// SAXReader就是一个管道，用一个流的方式，把xml文件读出来
			// SAXReader reader = new SAXReader(); //User.hbm.xml表示你要解析的xml文档
			// Document document = reader.read(new File("User.hbm.xml"));
			// 下面的是通过解析xml字符串的
			doc = DocumentHelper.parseText(xml); // 将字符串转为XML
			Element rootElt = doc.getRootElement(); // 获取根节点
			System.out.println("根节点：" + rootElt.getName()); // 拿到根节点的名称
			Iterator iter = rootElt.elementIterator("head"); // 获取根节点下的子节点head

			// 遍历head节点
			while (iter.hasNext()) {
				Element recordEle = (Element) iter.next();
				String title = recordEle.elementTextTrim("title"); // 拿到head节点下的子节点title值
				System.out.println("title:" + title);
				Iterator iters = recordEle.elementIterator("script"); // 获取子节点head下的子节点script
				// 遍历Header节点下的Response节点
				while (iters.hasNext()) {
					Element itemEle = (Element) iters.next();
					String username = itemEle.elementTextTrim("username"); // 拿到head下的子节点script下的字节点username的值
					String password = itemEle.elementTextTrim("password");
					System.out.println("username:" + username);
					System.out.println("password:" + password);
				}
			}
			Iterator iterss = rootElt.elementIterator("body"); // /获取根节点下的子节点body

			// 遍历body节点
			while (iterss.hasNext()) {
				Element recordEless = (Element) iterss.next();
				String result = recordEless.elementTextTrim("result"); // 拿到body节点下的子节点result值
				System.out.println("result:" + result);
				Iterator itersElIterator = recordEless.elementIterator("form"); // 获取子节点body下的子节点form

				// 遍历Header节点下的Response节点
				while (itersElIterator.hasNext()) {
					Element itemEle = (Element) itersElIterator.next();
					String banlce = itemEle.elementTextTrim("banlce"); // 拿到body下的子节点form下的字节点banlce的值
					String subID = itemEle.elementTextTrim("subID");
					System.out.println("banlce:" + banlce);
					System.out.println("subID:" + subID);
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	/**
	 * 将xml字符串转换成map
	 * 
	 * @Description:TODO
	 * @Author:h8wangjiabao
	 * @CreateDate: 2014-10-9 下午4:16:58
	 * @return Map
	 */
	public static Map readStringXmlOut(String xml) {
		Map map = new HashMap();
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml); // 将字符串转为XML
			Element rootElt = doc.getRootElement(); // 获取根节点
			System.out.println("根节点：" + rootElt.getName()); // 拿到根节点的名称
			Iterator iter = rootElt.elementIterator("head"); // 获取根节点下的子节点head

			// 遍历head节点
			while (iter.hasNext()) {
				Element recordEle = (Element) iter.next();
				String title = recordEle.elementTextTrim("title"); // 拿到head节点下的子节点title值
				System.out.println("title:" + title);
				map.put("title", title);
				Iterator iters = recordEle.elementIterator("script"); // 获取子节点head下的子节点script

				// 遍历Header节点下的Response节点
				while (iters.hasNext()) {
					Element itemEle = (Element) iters.next();
					String username = itemEle.elementTextTrim("username"); // 拿到head下的子节点script下的字节点username的值
					String password = itemEle.elementTextTrim("password");
					System.out.println("username:" + username);
					System.out.println("password:" + password);
					map.put("username", username);
					map.put("password", password);
				}
			}

			Iterator iterss = rootElt.elementIterator("body"); // /获取根节点下的子节点body

			// 遍历body节点
			while (iterss.hasNext()) {
				Element recordEless = (Element) iterss.next();
				String result = recordEless.elementTextTrim("result"); // 拿到body节点下的子节点result值
				System.out.println("result:" + result);
				Iterator itersElIterator = recordEless.elementIterator("form"); // 获取子节点body下的子节点form

				// 遍历Header节点下的Response节点
				while (itersElIterator.hasNext()) {
					Element itemEle = (Element) itersElIterator.next();
					String banlce = itemEle.elementTextTrim("banlce"); // 拿到body下的子节点form下的字节点banlce的值
					String subID = itemEle.elementTextTrim("subID");
					System.out.println("banlce:" + banlce);
					System.out.println("subID:" + subID);
					map.put("result", result);
					map.put("banlce", banlce);
					map.put("subID", subID);
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	public static void parse(String xml) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml); // 将字符串转为XML
			Element rootElt = doc.getRootElement(); // 获取根节点smsReport
			Iterator iters = rootElt.elementIterator("sendResp"); // 获取根节点下的子节点sms
			while (iters.hasNext()) {
				Element recordEle1 = (Element) iters.next();
				Iterator iter = recordEle1.elementIterator("sms");
				int i = 0;

				// 遍历sms节点
				while (iter.hasNext()) {
					Element recordEle = (Element) iter.next();
					String phone = recordEle.elementTextTrim("phone"); // 拿到sms节点下的子节点stat值
					String smsID = recordEle.elementTextTrim("smsID"); // 拿到sms节点下的子节点stat值
					System.out.println(phone + "===" + smsID);
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	 public static void main(String[] args) {
	 // 下面是需要解析的xml字符串例子
	 String xmlString = "<html>"
	 + "<head>"
	 + "<title>dom4j解析一个例子</title>"
	 + "<script>"
	 + "<username>yangrong</username>"
	 + "<password>123456</password>"
	 + "</script>"
	 + "</head>"
	 + "<body>"
	 + "<result>0</result>"
	 + "<form>"
	 + "<banlce>1000</banlce>"
	 + "<subID>36242519880716</subID>"
	 + "</form>"
	 + "</body>"
	 + "</html>";
	 /*
	 * Test2 test = new Test2(); test.readStringXml(xmlString);
	 // */
	 Map map = readStringXmlOut(xmlString);
	 Iterator iters = map.keySet().iterator();
	 while (iters.hasNext()) {
	 String key = iters.next().toString(); // 拿到键
	 String val = map.get(key).toString(); // 拿到值
	 // System.out.println(key + "=" + val);
	 }
	 String xml =
	 "<batchSendResp><sendResp><sms><phone>137000000</phone><smsID>ff8080813349da9001334f0eed8c5923</smsID></sms></sendResp><sendResp><sms><phone>187000000</phone><smsID>ff8080813349da9001334f0eee045924</smsID></sms></sendResp></batchSendResp>";
	 parse(xml);
	 }



	/**
	 * 解析组织机构数据
	 * 
	 * @param
	 * @return
	 */
	
	public static List<Map<String,String>> getDeptInfos(String deptInfoString) throws Exception{
		List<Map<String,String>> deptInfos=new ArrayList<Map<String,String>>();
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(deptInfoString);
			Element rootElt = doc.getRootElement();
			Iterator iter = rootElt.elementIterator("orgs");
			while (iter.hasNext()) {
				Element itemEle = (Element) iter.next();
				Iterator iters = itemEle.elementIterator("org");
				List<Element> deptList=itemEle.elements();
				for(Element e:deptList){
					List<Element> d=e.elements();
					Map<String,String> deptInfo=new HashMap<String, String>();
					for (Element info : d) {
						deptInfo.put(info.getName(), info.getTextTrim());
					}
				deptInfos.add(deptInfo);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return deptInfos;
	}
	
}