package org.andy.work.dao.impl;

import org.andy.work.dao.ApprovalitemDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Approvalitem;
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
@Repository("approvalitemDao")
public class ApprovalitemDaoImpl implements ApprovalitemDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Approvalitem load(int id) {
		return (Approvalitem) this.getCurrentSession().load(Approvalitem.class, id);
	}
	
	@Override
	public Approvalitem get(int id) {
		return (Approvalitem) this.getCurrentSession().get(Approvalitem.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Approvalitem getApprovalItem(Approval approval) {
		Criteria crit = this.getCurrentSession().createCriteria(Approvalitem.class);
		crit.add(Restrictions.eq("approval", approval));
		crit.add(Restrictions.eq("type", "填表范例"));
		Approvalitem list = (Approvalitem)crit.uniqueResult();

		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Approvalitem getGuide(Approval approval) {
		Criteria crit = this.getCurrentSession().createCriteria(Approvalitem.class);
		crit.add(Restrictions.eq("Approval", approval));
		crit.add(Restrictions.eq("Type", "办事指南"));
		List<Approvalitem> list = crit.list();
		if(list.size()==0)
			return null;
		return list.get(0);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Approvalitem> findAll() {
		List<Approvalitem> Approvals = this.getCurrentSession().createQuery("from Approvalitem").setCacheable(true).list();
		return Approvals;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Approvalitem> List(Approval Approval) {
		Criteria crit = this.getCurrentSession().createCriteria(Approvalitem.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("approval", Approval));
		List<Approvalitem> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@Override
	public void persist(Approvalitem entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Approvalitem entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Approvalitem entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Approvalitem entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
