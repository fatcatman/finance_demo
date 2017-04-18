package org.andy.work.controller;

import org.andy.work.entity.*;
import org.andy.work.service.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/Group")
public class GroupController {

	private static final Logger LOGGER = Logger.getLogger(GroupController.class);
	
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
	private FormtemplateService formtemplateService;
	@Autowired
	private GroupService groupService;
	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Group> List(int page,int limit, HttpSession session){
		GridDataResult<Group> result = new GridDataResult<Group>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try{

			List<Group> tList = groupService.List(page, limit);
			result.setItems(tList);
			result.setTotal(groupService.findAll().size());
			result.setPage(page);
			result.setLimit(limit);
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){

		}

		return result;
	}

	@RequestMapping("Save")
	public @ResponseBody ExtResult<Approval> Save(int id,String name, HttpSession session)
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
			List<Group> app_list = groupService.GetByName(name);
			for (Group tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("名称不能重复！");
					return result;
				}
			}
			Group group = groupService.get(id);
			if(group==null)
			{

				group=new Group();
				group.setCreateTime(Calendar.getInstance().getTime());
			}
			group.setName(name);

			groupService.saveOrUpdate(group);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Delete")
	public @ResponseBody ExtResult<Group> Delete(int id, HttpSession session)
	{
		ExtResult<Group> result = new ExtResult<Group>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Group group = groupService.get(id);
			if(group==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			List<Organ> orglist = organService.ListAllbyGroup(group);
			if(orglist.size()>0)
			{
				result.setSuccess(false);
				result.setMsg("已分配机构，请先删除下属机构！");
				return result;
			}
			groupService.delete(id);
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
			String formtempId=request.getParameter("formtempId");
			//String Link=request.getParameter("Link");
			ClassPathResource outFile = new ClassPathResource("/");
			String fileName= System.currentTimeMillis()+".png";
			String path=request.getSession().getServletContext().getRealPath("Content/Attachment/Img");
			String path2 ="http://"+request.getLocalAddr()+"/Attrachment/" + fileName;
			//先判断request中是否包涵multipart类型的数据，
			if(multipartResolver.isMultipart(request)){
				//再将request中的数据转化成multipart类型的数据
				MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
				Iterator iter = multiRequest.getFileNames();
				while(iter.hasNext()){
					MultipartFile file = multiRequest.getFile((String)iter.next());
					if(file != null){

						path+= "/"+fileName;
						File localFile = new File(path);
						//写文件到本地
						file.transferTo(localFile);
					}
				}
				FormTemplate formTemplate = formtemplateService.get(Integer.parseInt(formtempId));
				if(formTemplate==null)
				{
					result= 0;
					return result;
				}
				formTemplate.setPath(path2);
				formtemplateService.saveOrUpdate(formTemplate);
				result=2;
			}
		}catch (Exception ex){
			result=0;
		}
		return result;
	}

}
