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
@RequestMapping("/Image")
public class ImageController {

	private static final Logger LOGGER = Logger.getLogger(ImageController.class);
	
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
	public @ResponseBody GridDataResult<Image> List(int page,int limit, HttpSession session){
		GridDataResult<Image> result = new GridDataResult<Image>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		List<Image> imagelist = imageService.ListPage(page, limit);
		result.setItems(imagelist);
		result.setLimit(limit);
		result.setPage(page);
		result.setTotal(imageService.findAll().size());
		result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		return result;
	}


	@RequestMapping("Save")
	public @ResponseBody ExtResult<Image> Save(HttpServletRequest request,int id,String name,String type, HttpSession session)
	{
		ExtResult<Image> result = new ExtResult<Image>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			List<Image> app_list = imageService.GetByName(name);
			for (Image tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("名称不能重复！");
					return result;
				}
			}
			Image image = imageService.get(id);
			if(image==null)
			{
				image = new Image();
				image.setPath("/Attrachment/nopic.jpg");
			}
			image.setName(name);
			image.setDes(name);
			image.setType(type);
			imageService.saveOrUpdate(image);
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
			Image image = imageService.get(id);
			if(image==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			imageService.delete(id);
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
			String path=request.getSession().getServletContext().getRealPath("Attrachment");
			String path2 ="/Attrachment/" + fileName;
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
				Image image = imageService.get(Integer.parseInt(id));
				if(image==null)
				{
					image=new Image();
				}
				image.setPath(path2);
				imageService.saveOrUpdate(image);
				result=2;
			}
		}catch (Exception ex){
			result=0;
		}
		return result;
	}

}
