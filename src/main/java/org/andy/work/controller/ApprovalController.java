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
@RequestMapping("/Approval")
public class ApprovalController {

	private static final Logger LOGGER = Logger.getLogger(ApprovalController.class);
	
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


	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Approval> List(int page,int limit,int orgId,String param, HttpSession session){
		GridDataResult<Approval> result = new GridDataResult<Approval>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try {
			if (orgId == 0) {
				session.setAttribute("CurrentOrg", null);
				List<Approval> approvalList = approvalService.List(page, limit, param);
				for (int i=0;i<approvalList.size();i++) {
					List<Organapproval> orgapplist=organapprovalService.List(approvalList.get(i));
					String tmp_orgs="";
					for(Organapproval tmp_orgapp:orgapplist)
					{
						tmp_orgs+=tmp_orgapp.getOrgan().getName()+"；";
					}
					if(tmp_orgs.equals(""))
					{
						tmp_orgs="未知";
					}
					approvalList.get(i).setOrglist(tmp_orgs);
				}
				result.setPage(page);
				result.setLimit(limit);
				result.setItems(approvalList);
				result.setTotal(approvalService.findAll().size());
				result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
			} else {
				Organ org = organService.get(orgId);
				session.setAttribute("CurrentOrg", org);
				List<Approval> approvalList = approvalService.ListForOrg(page, limit, org);
				result.setPage(page);
				result.setLimit(limit);
				result.setItems(approvalList);
				result.setTotal(approvalService.ListAllForOrg(org).size());
				result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
			}
		}catch (Exception ex)
		{
			LOGGER.info(ex.getMessage());
		}
		return result;
	}

	@RequestMapping("/ListAllForOrg")
	public @ResponseBody GridDataResult<Approval> ListAllForOrg(int orgId, HttpSession session){
		GridDataResult<Approval> result = new GridDataResult<Approval>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		if(orgId!=0)
		{
			Organ org =organService.get(orgId);
			if(org!=null)
			{
				List<Approval> approvalList = approvalService.ListAllNotInOrg(org,1,10000,"");
				result.setItems(approvalList);
			}

		}
		return result;
	}
    @RequestMapping("/ListAllForOrgPage")
    public @ResponseBody GridDataResult<Approval> ListAllForOrgPage(int page,int limit,int orgId,String param, HttpSession session){
        GridDataResult<Approval> result = new GridDataResult<Approval>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
        if(orgId!=0)
        {
            Organ org =organService.get(orgId);
            if(org!=null)
            {
                List<Approval> approvalList = approvalService.ListAllNotInOrg(org,page,limit,param);
                result.setItems(approvalList);
				result.setPage(page);
				result.setLimit(limit);
				result.setItems(approvalList);
				result.setTotal(approvalService.ListAllNotInOrgCount(org,param).size());
				result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
            }

        }
        return result;
    }

	@RequestMapping("Save")
	public @ResponseBody ExtResult<Approval> Save(int id,String name,int orgId,String eventid, HttpSession session)
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
			boolean key=false;
			List<Approval> app_list = approvalService.GetByName(name);
			for (Approval tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("事项名称不能重复！");
					return result;
				}
			}
			Organ org =organService.get(orgId);
			Approval app = approvalService.get(id);
			if(org==null)
			{
				if(app==null)
				{
					app = new Approval();
					app.setName(name);
					app.setCreateTime(Calendar.getInstance().getTime());
					app.setEventid(eventid);
					//Integer tmp=;
					app.setID(approvalService.save(app));
					Approvalitem approvalitem1 = new Approvalitem();
					approvalitem1.setName("填表范例");
					approvalitem1.setType("填表范例");

					approvalitem1.setApproval(app);
					approvalitem1.setCreateTime(Calendar.getInstance().getTime());
					approvalitemService.saveOrUpdate(approvalitem1);
					Approvalitem approvalitem2 = new Approvalitem();
					approvalitem2.setName("办事指南");
					approvalitem2.setType("办事指南");
					approvalitem2.setApproval(app);
					approvalitem2.setCreateTime(Calendar.getInstance().getTime());
					approvalitemService.saveOrUpdate(approvalitem2);
				}else{
					app.setEventid(eventid);
					app.setName(name);
					approvalService.saveOrUpdate(app);
				}
			}else{
				if(app==null){
					result.setSuccess(false);
					result.setMsg("请选择事项！");
					return result;
				}
				Organapproval organapproval = new Organapproval();
				organapproval.setApproval(app);
				organapproval.setOrgan(org);
				organapprovalService.save(organapproval);
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
	public @ResponseBody ExtResult<Approval> Delete(int id, HttpSession session)
	{
		ExtResult<Approval> result = new ExtResult<Approval>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		Organ org =(Organ)session.getAttribute("CurrentOrg");
		if(org==null){
			try
			{
				Approval app = approvalService.get(id);
				List<Approvalitem> itemlist = approvalitemService.List(app);
				List<Organapproval> orglist = organapprovalService.List(app);
				if(app==null)
				{
					result.setSuccess(false);
					result.setMsg("未知错误，请联系管理员");
					return result;
				}
				for (Approvalitem tmp:itemlist) {
					if(tmp!=null){
						tmp.setApproval(null);
						approvalitemService.saveOrUpdate(tmp);
					}
				}
				for (Organapproval tmp:orglist) {
					if(tmp!=null){
						tmp.setApproval(null);
						organapprovalService.saveOrUpdate(tmp);
					}
				}
				approvalService.delete(id);
				result.setSuccess(true);
			}catch (Exception ex)
			{
				result.setSuccess(false);
				result.setMsg(ex.getMessage());
			}
		}else{
			Approval app = approvalService.get(id);
			Organapproval orgapp = organapprovalService.GetByOrg(app,org);
			if(orgapp!=null)
			{
				orgapp.setOrgan(null);
				orgapp.setApproval(null);
				organapprovalService.saveOrUpdate(orgapp);
				organapprovalService.delete(orgapp.getID());
			}
			result.setSuccess(true);
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
