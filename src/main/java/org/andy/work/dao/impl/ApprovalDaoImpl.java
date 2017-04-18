package org.andy.work.dao.impl;

import java.util.List;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.entity.AcctUser;
import org.andy.work.entity.Approval;
import org.andy.work.entity.FormTemplate;
import org.andy.work.entity.Organ;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 创建时间：2015-2-6 下午2:45:14
 *
 * @author andy
 * @version 2.2
 */
@Repository("approvalDao")
public class ApprovalDaoImpl implements ApprovalDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Approval load(int id) {
		return (Approval) this.getCurrentSession().load(Approval.class, id);
	}

	@Override
	public Approval get(int id) {
		return (Approval) this.getCurrentSession().get(Approval.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> findAll() {
		List<Approval> Approvals = this.getCurrentSession().createQuery("from Approval").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> List(int page,int size,String params) {
		if(params!="")
		{
			String sql="SELECT * from t_approval t WHERE t.Name like '%"+params+"%'";
			//sql = String.format(sql, params);
			List<Approval> Approvals = this.getCurrentSession().createSQLQuery(sql).addEntity(Approval.class).setFirstResult(page-1).setMaxResults(size).list();
			return Approvals;
		}else{
			List<Approval> Approvals = this.getCurrentSession().createQuery("from Approval").setFirstResult(page-1).setMaxResults(size).list();
			return Approvals;
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> ListForOrg(int page,int size,Organ org) {
		String sql="SELECT * from t_approval t WHERE t.ID IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+")";
		//sql = String.format(sql, org.getID());
		List<Approval> Approvals = this.getCurrentSession().createSQLQuery(sql).addEntity(Approval.class).setFirstResult(page-1).setMaxResults(size).list();
		return Approvals;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> ListAllForOrg(Organ org) {
		String sql="SELECT * from t_approval t WHERE t.ID IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+")";
		//sql = String.format(sql, org.getID());
		List<Approval> Approvals = this.getCurrentSession().createSQLQuery(sql).addEntity(Approval.class).list();
		return Approvals;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> ListAllNotInOrg(Organ org,int page,int size,String params) {
		String sql="SELECT * from t_approval t WHERE t.ID NOT IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+" and Approval is not NULL )";
		if(params!="")
		{
			sql="SELECT * from t_approval t WHERE t.ID NOT IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+" and Approval is not NULL ) and Name like '%"+params+"%'";
		}

		//sql = String.format(sql, org.getID());
		List<Approval> Approvals = this.getCurrentSession().createSQLQuery(sql).addEntity(Approval.class).setFirstResult(page-1).setMaxResults(size).list();
		return Approvals;
	}
    @SuppressWarnings("unchecked")
    @Override
    public List<Approval> ListAllNotInOrgCount(Organ org,String params) {
        String sql="SELECT * from t_approval t WHERE t.ID NOT IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+" and Approval is not NULL )";
        if(params!="")
        {
            sql="SELECT * from t_approval t WHERE t.ID NOT IN (select Approval from t_organapproval WHERE Organ = "+org.getID()+" and Approval is not NULL ) and Name like '%"+params+"%'";
        }

        //sql = String.format(sql, org.getID());
        List<Approval> Approvals = this.getCurrentSession().createSQLQuery(sql).addEntity(Approval.class).list();
        return Approvals;
    }
	@SuppressWarnings("unchecked")
	@Override
	public List<Approval> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(Approval.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<Approval> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@Override
	public void persist(Approval entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Approval entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Approval entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Approval entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();

	}

}
