package org.andy.work.controller;

import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.andy.work.entity.Approval;
import org.andy.work.entity.ExtResult;
import org.andy.work.entity.GridDataResult;
import org.andy.work.entity.Parameter;
import org.andy.work.service.ParameterService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**  
 * 创建时间：2015-2-7 上午11:49:00  
 * @author andy  
 * @version 2.2  
 * 描述： 用户Controller
 */
@Controller
@RequestMapping("/Parameter")
public class ParameterController {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = Logger.getLogger(ParameterController.class);

	@Autowired
	private ParameterService parameterService;
	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Parameter> List(int page,int limit, HttpSession session){
		GridDataResult<Parameter> result = new GridDataResult<Parameter>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try{

			List<Parameter> tList = parameterService.list(page, limit);
			result.setItems(tList);
			result.setTotal(parameterService.findAll().size());
			result.setPage(page);
			result.setLimit(limit);
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){

		}

		return result;
	}

	@RequestMapping("Save")
	public @ResponseBody ExtResult<Approval> Save(int id,String name, String type, String value, HttpSession session)
	{
		ExtResult<Approval> result = new ExtResult<Approval>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			List<Parameter> app_list = parameterService.getByNameAndType(name, type);
			for (Parameter tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("名称与分类的组合不能重复！");
					return result;
				}
			}
			Parameter parameter = parameterService.get(id);
			if(parameter==null)
			{

				parameter=new Parameter();
				parameter.setCreateTime(Calendar.getInstance().getTime());
			}
			parameter.setName(name);
			parameter.setType(type);
			parameter.setValue(value);

			parameterService.saveOrUpdate(parameter);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Delete")
	public @ResponseBody ExtResult<Parameter> Delete(int id, HttpSession session)
	{
		ExtResult<Parameter> result = new ExtResult<Parameter>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Parameter parameter = parameterService.get(id);
			if(parameter==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
//			List<Organ> orglist = organService.ListAllbyParameter(parameter);
//			if(orglist.size()>0)
//			{
//				result.setSuccess(false);
//				result.setMsg("已分配机构，请先删除下属机构！");
//				return result;
//			}
			parameterService.delete(id);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

}
