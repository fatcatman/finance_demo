package org.andy.work.controller;

import org.andy.work.entity.*;
import org.andy.work.service.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

/**
 * 创建时间：2015-2-7 上午11:49:00  
 * @author andy
 * @version 2.2
 * 描述： 用户Controller
 */
@Controller
@RequestMapping("/Organ")
public class OrganController {

	private static final Logger LOGGER = Logger.getLogger(OrganController.class);

	@Autowired
	private ApprovalService approvalService;

	@Autowired
	private OrganService organService;
	@Autowired
	private ApprovalitemService approvalitemService;
	@Autowired
	private OrganapprovalService organapprovalService;
	@Autowired
	private ImageService imageService;
	@Autowired
	private GroupService groupService;

	@Autowired
	private GrouporganService grouporganService;

	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Organ> List(int page,int limit,int groupId, HttpSession session){
		GridDataResult<Organ> result = new GridDataResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try{

			Group group =groupService.get(groupId);
			List<Organ> orglist = organService.ListbyGroup(page,limit,group);
			result.setItems(orglist);
			result.setLimit(limit);
			result.setPage(page);
			result.setTotal(organService.ListAllbyGroup(group).size());
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){
			LOGGER.info(ex.getMessage());
		}

		return result;
	}

	@RequestMapping("/AllList")
	public @ResponseBody GridDataResult<Organ> AllList(int page,int limit, HttpSession session){
		GridDataResult<Organ> result = new GridDataResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		List<Organ> orglist = organService.List(page,limit);
		result.setItems(orglist);
		result.setLimit(limit);
		result.setPage(page);
		result.setTotal(organService.findAll().size());
		result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		return result;
	}

	@RequestMapping("/AllNotList")
	public @ResponseBody GridDataResult<Organ> AllNotList(int page,int limit, int groupId, HttpSession session){
		GridDataResult<Organ> result = new GridDataResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try{
			Group group =groupService.get(groupId);
			List<Organ> orglist = organService.ListNotGroup(page,limit,group);
			result.setItems(orglist);
			result.setLimit(limit);
			result.setPage(page);
			result.setTotal(organService.ListAllNotGroup(group).size());
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){
			LOGGER.info(ex.getMessage());
		}

		return result;
	}

	@RequestMapping("Save")
	public @ResponseBody ExtResult<Organ> Save(int id,String name, HttpSession session)
	{
		ExtResult<Organ> result = new ExtResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			List<Organ> app_list = organService.GetByName(name);
			for (Organ tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("名称不能重复！");
					return result;
				}
			}
			Organ org = organService.get(id);
			if(org==null)
			{

				org = new Organ();
				org.setCreateTime(Calendar.getInstance().getTime());
			}
			org.setName(name);
			organService.saveOrUpdate(org);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("SaveGroup")
	public @ResponseBody ExtResult<Organ> SaveGroup(int id,int groupId, HttpSession session)
	{
		ExtResult<Organ> result = new ExtResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Organ org = organService.get(id);
			Group group = groupService.get(groupId);
			if(org==null || group==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}else{
				Grouporgan grouporg = grouporganService.getMapping(org,group);
				if (grouporg==null)
				{
					grouporg=new Grouporgan();
					grouporg.setOrgan(org);
					grouporg.setGroupID(group);
					grouporganService.save(grouporg);
				}
			}
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("Delete")
	public @ResponseBody ExtResult<Organ> Delete(int id, HttpSession session)
	{
		ExtResult<Organ> result = new ExtResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Organ org = organService.get(id);
			if(org==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			List<Approval> applist = approvalService.ListAllForOrg(org);
			if(applist.size()>0){
				result.setSuccess(false);
				result.setMsg("已创建添加事项，请先删除事项！");
				return result;
			}
			List<Grouporgan> grouporglist = grouporganService.getByOrg(org);
			for (Grouporgan tmp:grouporglist) {
				if (tmp!=null)
				{
					tmp.setGroupID(null);
					tmp.setOrgan(null);
					grouporganService.saveOrUpdate(tmp);
					grouporganService.delete(tmp.getID());
				}
			}

			organService.delete(id);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("DeleteGroup")
	public @ResponseBody ExtResult<Organ> DeleteGroup(int id,int groupId, HttpSession session)
	{
		ExtResult<Organ> result = new ExtResult<Organ>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Organ org = organService.get(id);
			Group group = groupService.get(groupId);
			if(org==null || group==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}else{
				Grouporgan grouporg = grouporganService.getMapping(org,group);
				if (grouporg==null)
				{
					result.setSuccess(false);
					result.setMsg("未知错误，请联系管理员");
					return result;
				}
				grouporg.setGroupID(null);
				grouporg.setOrgan(null);
				grouporganService.saveOrUpdate(grouporg);
				grouporganService.delete(grouporg.getID());
			}
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	/// <summary>
	/// 上传图片
	/// </summary>
	/// <param name="bookId"></param>
	/// <returns></returns>
	@RequestMapping("UploadFile")
	public @ResponseBody int UploadFile(HttpServletRequest request, HttpServletResponse response)
			throws IllegalStateException, IOException {
		int result = 1;
		try
		{
			//解析器解析request的上下文
			CommonsMultipartResolver multipartResolver =
					new CommonsMultipartResolver(request.getSession().getServletContext());
			String id=request.getParameter("id");
			//String Link=request.getParameter("Link");
			ClassPathResource outFile = new ClassPathResource("/");
			String fileName= System.currentTimeMillis()+".png";
			String path=request.getSession().getServletContext().getRealPath("Content/Attachment/Img");
			//先判断request中是否包涵multipart类型的数据，
			if(multipartResolver.isMultipart(request)){
				//再将request中的数据转化成multipart类型的数据
				MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
				Iterator iter = multiRequest.getFileNames();
				while(iter.hasNext()){
					MultipartFile file = multiRequest.getFile((String)iter.next());
					if(file != null){

						//file.getOriginalFilename();

						//File file = new File(path+"/"+time+ ".jpg");
						//String path = outFile.getFile().getParent() +
						path+= "/"+fileName;
						File localFile = new File(path);
						//写文件到本地
						file.transferTo(localFile);
					}
				}
				Image image = imageService.get(Integer.parseInt(id));
				if(image==null)
				{
					image=new Image();
				}
				image.setPath(path);
				imageService.saveOrUpdate(image);
				result=2;
			}
		}catch (Exception ex){
			result=0;
		}
		return result;
	}

}
