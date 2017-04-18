package org.andy.work.controller;

import org.andy.work.Client.SimpleMinaClientHandler;
import org.andy.work.entity.*;
import org.andy.work.service.*;
import org.apache.log4j.Logger;
import org.apache.mina.core.filterchain.DefaultIoFilterChainBuilder;
import org.apache.mina.core.future.ConnectFuture;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
import org.apache.mina.transport.socket.nio.NioSocketConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.InetSocketAddress;
import java.util.List;

/**  
 * 创建时间：2015-2-7 上午11:49:00  
 * @author andy  
 * @version 2.2  
 * 描述： 用户Controller
 */
@Controller
@RequestMapping("/")
public class ServiceController {

	private static final Logger LOGGER = Logger.getLogger(ApprovalController.class);
	
	@Autowired
	private ApprovalService approvalService;
	
	@Autowired
	private OrganService organService;

	@Autowired
	private ImageService imageService;
	@Autowired
	private GroupService groupService;
	@Autowired
	private FormtemplateService formtemplateService;
	@Autowired
	private ApprovalitemService approvalitemService;
	/**
	 * 服务器ip
	 */
	private static final String SERVER_IP="121.40.216.238";

	/**
	 * 服务器端口
	 */
	private static final int SERVER_PORT=8899;
	@RequestMapping("GetImage")
	public @ResponseBody ExtResult<Image> GetImage(String type){
		ExtResult<Image> result = new ExtResult<Image>();
		try{
			if(type==null)
				type="";
			List<Image> imageList = imageService.List(type);
			result.setObj(imageList);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Mina")
	public @ResponseBody String  Mina(){
		Thread t=new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					//Create TCP/IP connection
					NioSocketConnector connector = new NioSocketConnector();

					//创建接受数据的过滤器
					DefaultIoFilterChainBuilder chain = connector.getFilterChain();

					//设定这个过滤器将一行一行(/r/n)的读取数据
					chain.addLast("myChain", new ProtocolCodecFilter(new TextLineCodecFactory()));

					//服务器的消息处理器：一个 SimpleMinaClientHandler 对象
					connector.setHandler(new SimpleMinaClientHandler());

					//set connect timeout
					connector.setConnectTimeoutMillis(100 * 1000);

					//连接到服务器：
					ConnectFuture cf = connector.connect(new InetSocketAddress(SERVER_IP,SERVER_PORT));

					cf.awaitUninterruptibly();

					cf.getSession().getCloseFuture().awaitUninterruptibly();

					connector.dispose();

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		t.start();
		return "nihao";
	}
	@RequestMapping("Search")
	public @ResponseBody GridDataResult<FormTemplate> Search(String param, int groupId, int pageIndex, int pageSize){
		GridDataResult<FormTemplate> result = new GridDataResult<FormTemplate>();
		try{
			Group group = groupService.get(groupId);
			if(param==null)
				param="";
			List<FormTemplate> tList = formtemplateService.Search(pageIndex,pageSize,param,group);
			result.setItems(tList);
			result.setTotal(formtemplateService.searchAll(param,group).size());
			result.setPage(pageIndex);
			result.setLimit(pageSize);
			result.setTotalPage(result.getTotal() % pageSize == 0 ? result.getTotal() / pageSize : result.getTotal() / pageSize + 1);
		}catch (Exception ex)
		{

		}
		return result;
	}
	@RequestMapping("GroupList")
	public @ResponseBody ExtResult<Group> GroupList()
	{
		ExtResult<Group> result = new ExtResult<Group>();
		try
		{
			List<Group> tList = groupService.findAll();
			result.setObj(tList);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("OrgList")
	public @ResponseBody GridDataResult<Organ> OrgList(int groupId,int pageIndex,int pageSize)
	{
		GridDataResult<Organ> result = new GridDataResult<Organ>();
		try
		{
			Group group = groupService.get(groupId);
			List<Organ> tList = organService.ListbyGroup(pageIndex,pageSize,group);
			result.setItems(tList);
			result.setTotal(organService.ListAllbyGroup(group).size());
			result.setPage(pageIndex);
			result.setLimit(pageSize);
			result.setTotalPage(result.getTotal() % pageSize == 0 ? result.getTotal() / pageSize : result.getTotal() / pageSize + 1);
		}catch (Exception ex)
		{

		}
		return result;
	}

	@RequestMapping("ApprovalList")
	public @ResponseBody GridDataResult<Approval> ApprovalList(int orgId,int pageIndex,int pageSize)
	{
		GridDataResult<Approval> result = new GridDataResult<Approval>();
		try
		{
			Organ org = organService.get(orgId);
			List<Approval> tList = approvalService.ListForOrg(pageIndex,pageSize,org);
			result.setItems(tList);
			result.setTotal(approvalService.ListAllForOrg(org).size());
			result.setPage(pageIndex);
			result.setLimit(pageSize);
			result.setTotalPage(result.getTotal() % pageSize == 0 ? result.getTotal() / pageSize : result.getTotal() / pageSize + 1);
		}catch (Exception ex)
		{

		}
		return result;
	}

	@RequestMapping("ApprovalItemList")
	public @ResponseBody ExtResult<Approvalitem> ApprovalItemList(int approvalId)
	{
		ExtResult<Approvalitem> result = new ExtResult<Approvalitem>();
		try
		{
			Approval approval = approvalService.get(approvalId);
			if(approval!=null)
			{
				List<Approvalitem> tList = approvalitemService.List(approval);
				 for(int i=0;i<tList.size();i++){
					 tList.get(i).setEventCode(approval.getEventid());
				 }
				result.setObj(tList);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("无效的事项！");
			}

		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("FormTemplateList")
	public @ResponseBody ExtResult<FormTemplate> FormTemplateList(int approvalItemId)
	{
		ExtResult<FormTemplate> result = new ExtResult<FormTemplate>();
		try
		{
			Approvalitem approvalitem = approvalitemService.get(approvalItemId);
			if(approvalitem!=null)
			{
				List<FormTemplate> tList = formtemplateService.List(approvalitem);
				result.setObj(tList);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("无效的范例！");
			}

		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("HotFormTemplateList")
	public @ResponseBody ExtResult<FormTemplate> HotFormTemplateList(int groupId)
	{
		ExtResult<FormTemplate> result = new ExtResult<FormTemplate>();
		try
		{
			Group group = groupService.get(groupId);
			if(group!=null)
			{
				List<FormTemplate> tList = formtemplateService.HotList(group);
				result.setObj(tList);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("无效的组！");
			}

		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("LookTemplateLog")
	public @ResponseBody ExtResult<FormTemplate> LookTemplateLog(int formtemplateId)
	{
		ExtResult<FormTemplate> result = new ExtResult<FormTemplate>();
		try
		{
			FormTemplate formtemp = formtemplateService.get(formtemplateId);
			if(formtemp!=null)
			{
				formtemp.setSearchNum(formtemp.getSearchNum()+1);
				formtemplateService.saveOrUpdate(formtemp);
				result.setSuccess(true);
			}else{
				result.setSuccess(false);
				result.setMsg("无效的模板！");
			}

		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

	@RequestMapping("IsConnect")
	public @ResponseBody ExtResult<FormTemplate> IsConnect()
	{
		ExtResult<FormTemplate> result = new ExtResult<FormTemplate>();
		try
		{
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}






	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Approval> showUserInfos(int page,int size,int orgId,String param){
		GridDataResult<Approval> result = new GridDataResult<Approval>();
		if(orgId==0)
		{
			List<Approval> approvalList = approvalService.List(page, size,param);
			result.setPage(page);
			result.setLimit(size);
			result.setItems(approvalList);
			result.setTotal(approvalService.findAll().size());
		}else{
			Organ org = organService.get(orgId);
			List<Approval> approvalList = approvalService.ListForOrg(page, size, org);
			result.setPage(page);
			result.setLimit(size);
			result.setItems(approvalList);
			result.setTotal(approvalService.ListAllForOrg(org).size());
		}
		return result;
		
	}


}
