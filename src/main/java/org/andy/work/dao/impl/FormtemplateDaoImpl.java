package org.andy.work.dao.impl;

import org.andy.work.dao.FormtemplateDao;
import org.andy.work.entity.Approvalitem;
import org.andy.work.entity.FormTemplate;
import org.andy.work.entity.Group;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:45:14
 * 
 * @author andy
 * @version 2.2
 */
@Repository("formtemplateDao")
public class FormtemplateDaoImpl implements FormtemplateDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public FormTemplate load(int id) {
		return (FormTemplate) this.getCurrentSession().load(FormTemplate.class, id);
	}
	
	@Override
	public FormTemplate get(int id) {
		return (FormTemplate) this.getCurrentSession().get(FormTemplate.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> findAll() {
		List<FormTemplate> Approvals = this.getCurrentSession().createQuery("from FormTemplate").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> search(int page,int size,String param,Group group) {
		String sql = "";
		if(group!=null)
		{
			sql = "SELECT * FROM t_formTemplate WHERE ApprovalItem in (SELECT ID FROM t_approvalitem WHERE Approval in (SELECT Approval FROM t_organapproval WHERE Organ in (SELECT ID FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")))) and Name like '%"+param+"%'";
			//sql = String.Format(sql, group.ID, param);
		}else
		{
			sql = "SELECT * FROM t_formTemplate WHERE ApprovalItem in (SELECT ID FROM t_approvalitem WHERE Approval in (SELECT Approval FROM t_organapproval WHERE Organ in (SELECT ID FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan)))) and Name like '%"+param+"%'";
			//sql = String.Format(sql,param);
		}
		List<FormTemplate> list = this.getCurrentSession().createSQLQuery(sql).addEntity(FormTemplate.class).setFirstResult(page-1).setMaxResults(size).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> searchAll(String param,Group group) {
		String sql = "";
		if(group!=null)
		{
			sql = "SELECT * FROM t_formTemplate WHERE ApprovalItem in (SELECT ID FROM t_approvalitem WHERE Approval in (SELECT Approval FROM t_organapproval WHERE Organ in (SELECT ID FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")))) and Name like '%"+param+"%'";
			//sql = String.Format(sql, group.ID, param);
		}else
		{
			sql = "SELECT * FROM t_formTemplate WHERE ApprovalItem in (SELECT ID FROM t_approvalitem WHERE Approval in (SELECT Approval FROM t_organapproval WHERE Organ in (SELECT ID FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan)))) and Name like '%"+param+"%'";
			//sql = String.Format(sql,param);
		}
		List<FormTemplate> list = this.getCurrentSession().createSQLQuery(sql).addEntity(FormTemplate.class).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> List(Approvalitem Approvalitem) {
		Criteria crit = this.getCurrentSession().createCriteria(FormTemplate.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("approvalItem", Approvalitem));
		List<FormTemplate> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}

	public List<FormTemplate> List(Approvalitem Approvalitem,int page,int size) {
		Criteria crit = this.getCurrentSession().createCriteria(FormTemplate.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("approvalItem", Approvalitem));
		crit.setMaxResults(size).setFirstResult((page-1)*size);
		List<FormTemplate> list = crit.list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(FormTemplate.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<FormTemplate> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FormTemplate> HotList(Group group) {
		String sql = "SELECT * FROM t_formtemplate WHERE ApprovalItem in (SELECT ID FROM t_approvalitem WHERE Approval in (SELECT Approval FROM t_organapproval WHERE Organ in (SELECT ID FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")))) ORDER BY SearchNum DESC";
		List<FormTemplate> list =this.getCurrentSession().createSQLQuery(sql).addEntity(FormTemplate.class).list();
		return list;
	}

	@Override
	public void persist(FormTemplate entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(FormTemplate entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(FormTemplate entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		FormTemplate entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
