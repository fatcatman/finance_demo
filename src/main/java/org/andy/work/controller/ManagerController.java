package org.andy.work.controller;

import org.andy.work.Util.WebService;
import org.andy.work.entity.*;
import org.andy.work.service.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**  
 * 创建时间：2015-2-7 上午11:49:00  
 * @author andy  
 * @version 2.2  
 * 描述： 用户Controller
 */
@Controller
@RequestMapping("/Manager")
public class ManagerController {

	private static final Logger LOGGER = Logger.getLogger(ManagerController.class);
	
	@Autowired
	private ApprovalService approvalService;
	
	@Autowired
	private OrganService organService;
	@Autowired
	private ApprovalitemService approvalitemService;
	@Autowired
	private OrganapprovalService organapprovalService;
	@Autowired
	private ManagerService managerService;
	@Autowired
	private ManagerRoleService managerRoleService;

	@RequestMapping("/GetCurrentManager")
	public @ResponseBody Manager GetCurrentManager(HttpSession session){
		Manager manager =(Manager)session.getAttribute("CurrentManager");

		return manager;
	}
	@RequestMapping("/showEventInfo")
	public String showEventInfo(ModelMap modelMap,  String eventCode){
		LOGGER.info("打开办事指南：" + eventCode);
		//WebService.queryEventInfoForShow("110108000-JS-GF-001", showType);
		String html = WebService.queryEventInfoForShow(eventCode, "1");
		modelMap.addAttribute("html", html);
		return "/user/showEventInfo";
	}


	@RequestMapping("/GetUserByID")
	public @ResponseBody Manager GetUserByID(int id){
		Manager manager =managerService.get(id);
		return manager;
	}
	@RequestMapping("/LogOut")
	public @ResponseBody ExtResult<Manager> LogOut(HttpSession session){
		ExtResult<Manager> result = new ExtResult<Manager>();
		try{
			session.removeAttribute("CurrentManager");
			result.setMsg("您已退出系统");
			result.setSuccess(true);
		}catch (Exception ex){
			result.setSuccess(false);
		}

		return result;
	}

	@RequestMapping("/TimeOut")
	public @ResponseBody ExtResult<Manager> TimeOut(HttpSession session){
		ExtResult<Manager> result = new ExtResult<Manager>();

		session.removeAttribute("CurrentManager");
		result.setMsg("登陆超时，请您重新登陆");
		result.setSuccess(true);
		result.setTimeout(true);
		return result;
	}

	@RequestMapping("/UpdateUser")
	public @ResponseBody ExtResult<Manager> UpdateUser(){
		ExtResult<Manager> result = new ExtResult<Manager>();
		result.setSuccess(true);
		return result;
	}

	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Manager> List(int page,int limit,String type, HttpSession session){
		GridDataResult<Manager> result = new GridDataResult<Manager>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		Role role = managerRoleService.getByType(type);
		List<Manager> managerlist = managerService.List(page, limit, role);
		result.setItems(managerlist);
		result.setPage(page);
		result.setLimit(limit);
		result.setTotal(managerService.ListAll(role).size());
		result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		return result;
	}



	@RequestMapping("Save")
	public @ResponseBody ExtResult<Manager> Save(String Account,String Pwd,int roleId, HttpSession session)
	{
		ExtResult<Manager> result = new ExtResult<Manager>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Manager manager = managerService.getByAccount(Account);
			if(manager!=null)
			{
				result.setSuccess(false);
				result.setMsg("该账号已经存在");
				return result;
			}
			manager=new Manager();
			manager.setAccount(Account);
			manager.setPwd(Pwd);
			manager.setRole(managerRoleService.get(roleId));
			managerService.saveOrUpdate(manager);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("UpdatePwd")
	public @ResponseBody ExtResult<Manager> UpdatePwd(HttpSession session,String OldPwd, String NewPwd)
	{
		ExtResult<Manager> result = new ExtResult<Manager>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Manager manager =(Manager)session.getAttribute("CurrentManager");
			if(manager==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			if(manager.getPwd().equals(OldPwd))
			{
				manager.setPwd(NewPwd);
				managerService.saveOrUpdate(manager);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("原始密码错误，请重试...");
				return result;
			}

		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("UpdatePwdForManager")
	public @ResponseBody ExtResult<Manager> UpdatePwdForManager(int id, String newPwd)
	{
		ExtResult result = new ExtResult();
		try
		{
			Manager manager = managerService.get(id);
			if(manager!=null)
			{
				manager.setPwd(newPwd);
				managerService.saveOrUpdate(manager);
			}
			result.setSuccess(true);
		}
		catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Delete")
	public @ResponseBody ExtResult<Manager> Delete(int id, HttpSession session)
	{
		ExtResult<Manager> result = new ExtResult<Manager>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Manager manager = managerService.get(id);
			if(manager==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			managerService.delete(id);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Login")
	public @ResponseBody ExtResult<Manager> Login(HttpSession session,String Account, String pwd)
	{
		ExtResult<Manager> result = new ExtResult<Manager>();
		try
		{
			Manager manager = managerService.getByAccount(Account);
			if(manager==null)
			{
				result.setSuccess(false);
				result.setMsg("该管理员不存在");
				return result;
			}
			if(manager.getPwd().equals(pwd))
			{
				session.setAttribute("CurrentManager",manager);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("密码错误");
				return result;
			}
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg(ex.getMessage());
		}
		return result;
	}

}
